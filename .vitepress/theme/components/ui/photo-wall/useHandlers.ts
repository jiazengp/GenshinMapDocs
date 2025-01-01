import { useVModel } from '@vueuse/core'
import { watch } from 'vue'
import {
  type UploadFile,
  type UploadFiles,
  type UploadProps,
  type UploadRawFile,
  type UploadStatus,
  genFileId,
} from './upload'
import { isNil } from 'lodash-es'

import type { UploadPhotoInstance, UploadPhotoProps } from './uploadPhoto'
import type { ShallowRef } from 'vue'

const revokeFileObjectURL = (file: UploadFile) => {
  if (file.url?.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

export const useHandlers = (
  props: UploadProps,
  uploadRef: ShallowRef<UploadPhotoInstance | undefined>,
) => {
  const uploadFiles = useVModel(
    props as Omit<UploadProps, 'fileList'> & { fileList: UploadFiles },
    'fileList',
    undefined,
    { passive: true },
  )

  const getFile = (rawFile: UploadRawFile) =>
    uploadFiles.value.find((file: { uid: any }) => file.uid === rawFile.uid)

  function clearFiles(
    /** @default ['ready', 'uploading', 'success', 'fail'] */
    states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail'],
  ) {
    uploadFiles.value = uploadFiles.value.filter(
      (row) => !states.includes(row.status!),
    )
  }

  const handleRemove: UploadPhotoProps['onRemove'] = async (
    file,
  ): Promise<void> => {
    const uploadFile = file instanceof File ? getFile(file) : file
    if (!uploadFile) new Error('file to be removed not found')

    const doRemove = (file: UploadFile) => {
      removeFile(file)
      props.onRemove(file, uploadFiles.value)
      revokeFileObjectURL(file)
    }

    doRemove(uploadFile!)
  }

  function removeFile(file: UploadFile) {
    uploadFiles.value = uploadFiles.value.filter(
      (uploadFile) => uploadFile !== file,
    )
  }

  const handleStart: UploadPhotoProps['onStart'] = (file: UploadRawFile) => {
    if (isNil(file.uid)) file.uid = genFileId()
    const uploadFile: UploadFile = {
      name: file.name,
      status: props.defaultState,
      size: file.size,
      raw: file,
      uid: file.uid,
      url: URL.createObjectURL(file),
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile]
    props.onChange(uploadFile, uploadFiles.value)
  }

  watch(
    uploadFiles,
    (files) => {
      for (const file of files) {
        if (file.uid) return
        file.uid ||= genFileId()
        console.log(file.status)
        file.status ||= 'success'
      }
    },
    { immediate: true, deep: true },
  )

  return {
    uploadFiles,
    clearFiles,
    handleStart,
    handleRemove,
    getFile,
    revokeFileObjectURL,
  }
}