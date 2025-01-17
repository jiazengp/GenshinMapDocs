import ky from 'ky'
import { catchError } from '../../utils'
import { normalizeImage } from './utils'

import type ForumAPI from '../api'

export const PREFIX_URL = 'https://images.violetsnow.cc/api/v1/'

export const fetcher = ky.create({
  prefixUrl: PREFIX_URL,
  timeout: 8000,
  retry: 2,
})

export const uploadImg = async (
  rawFile: File,
  id: number,
): Promise<ForumAPI.Image> => {
  const formData = new FormData()
  formData.append('file', rawFile)

  const [error, response] = await catchError(
    fetcher.post<IMAGES_UPLOAD.IMAGE>('upload', {
      body: formData,
    }),
  )

  if (error) return Promise.reject(error)

  const data = await response.json()

  if (!data.status)
    return Promise.resolve({ id: id, message: data.message, state: false })

  return normalizeImage(data)
}
