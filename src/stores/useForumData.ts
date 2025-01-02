import { issues } from '@/apis/forum/gitee'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import { useLoadMore } from '../composables/useLoadMore'
import { useData } from 'vitepress'
import { toast } from 'vue-sonner'
import { defineStore } from 'pinia'

import type ForumAPI from '@/apis/forum/api'
import { isArray, isError, uniqBy } from 'lodash-es'
import { useRequest } from 'vue-request'
import { useUrlSearchParams, watchOnce } from '@vueuse/core'
import { convertMultipleToMarkdown } from '../components/forum/utils'
import { useUserAuthStore } from '@/stores/useUserAuth'
import { removeQueryParam } from '@/utils'

const filterSet = new Set(['FEAT', 'BUG', 'ALL', 'SUG'])

export const useForumData = defineStore('forum-data', () => {
  const userSubmittedTopic = ref<ForumAPI.Topic[]>([])
  const topics = ref<ForumAPI.Topic[]>([])
  const isSearching = ref(false)
  const defaultPageSize = 20
  const pagination = reactive<{
    sort: string
    page: number
    filter: FilterType
  }>({
    sort: 'created',
    page: 1,
    filter: getValidFilter() || 'ALL',
  })

  const { theme, lang } = useData()

  const {
    data,
    runAsync,
    loading,
    loadMore,
    noMore,
    initialData,
    error,
    totalPage,
    total,
  } = useLoadMore(issues.getTopics, {
    manual: true,
  })

  const {
    data: annData,
    loading: annLoading,
    error: annLoadError,
    runAsync: loadAnn,
  } = useRequest(issues.getAnnouncementList)

  const refreshData = async (q?: string | string[]) => {
    const data = await runAsync(
      {
        current: pagination.page,
        sort: pagination.sort,
        pageSize: defaultPageSize,
        filter: [
          pagination.filter === 'ALL' ? 'WEB-FEEDBACK' : pagination.filter,
        ],
      },
      q ? encodeURIComponent(String(q)) : undefined,
    )

    console.log(data)
  }

  const switchTopicFilter = (val = pagination.filter) => {
    if (!val) return
    pagination.filter = val
  }

  const searchTopics = async (q: string | string[]) => {
    initialData()

    if (q.length === 0) return (isSearching.value = false)

    isSearching.value = true

    return refreshData(q)
  }

  const topicAction = async (
    action: Function,
    argument: any[],
    successMsg: string,
    errorMsg: string,
  ) => {
    const userAuth = useUserAuthStore()
    if (!userAuth.isTokenValid) {
      toast.info(theme.value.forum.auth.loginTips)
      return false
    }

    const state = await action(userAuth.accessToken, ...argument)

    if (state) {
      toast.success(successMsg)
    } else {
      toast.error(errorMsg)
    }

    return state
  }

  const closeTopic = async (id: string | number): Promise<boolean> => {
    const state = await topicAction(
      issues.putTopic,
      [id, { state: 'closed' }],
      theme.value.forum.topic.menu.closeFeedback.success,
      theme.value.forum.topic.menu.closeFeedback.fail,
    )
    if (state) removeTopic(id)
    return state
  }

  const deleteComment = async (id: string | number): Promise<boolean> => {
    return await topicAction(
      issues.deleteIssueComment,
      [id],
      theme.value.forum.topic.menu.deleteComment.success,
      theme.value.forum.topic.menu.deleteComment.fail,
    )
  }

  const removeTopic = (id: string | number) => {
    topics.value = topics.value.filter((topic) => topic.id !== id)
    userSubmittedTopic.value = userSubmittedTopic.value.filter(
      (topic) => topic.id !== id,
    )
  }

  const submitTopic = () => {
    const userAuth = useUserAuthStore()

    const {
      data: submittedTopic,
      runAsync: submit,
      loading: submitLoading,
      error: submitError,
    } = useRequest(issues.postTopic, {
      manual: true,
    })

    const submitData = (
      type: ForumAPI.TopicType,
      body: {
        title: string
        content: {
          text: string
          images?: string[]
        }
        tags: string[]
      },
    ) => {
      const bodyText = () => {
        if (!isArray(body.content?.images)) return body.content.text
        return (
          body.content.text + convertMultipleToMarkdown(body.content.images)
        )
      }

      submit(userAuth.accessToken, {
        body: bodyText(),
        title: `${type}:${body.title}`,
        labels: Array.from(
          new Set([
            'WEB-FEEDBACK',
            type,
            lang.value.substring(0, 2).toLocaleUpperCase(),
            ...body.tags,
          ]),
        ).join(','),
      })
    }

    watch(submitLoading, () => {
      if (!submittedTopic.value) return
      userSubmittedTopic.value.unshift(submittedTopic.value)
      toast.success(theme.value.forum.publish.publishSuccess)
    })

    watch(submitError, () => {
      toast.info(theme.value.forum.publish.publishFail)
    })

    return {
      data: submittedTopic,
      loading: submitLoading,
      error: submitError,
      runAsync: submitData,
    }
  }

  const isFirstLoad = computed(() =>
    Boolean(
      topics.value.length === 0 && !noMore.value && !isError(error.value),
    ),
  )
  const canLoadMore = computed(
    () => !noMore.value && !isFirstLoad.value && !isError(error),
  )
  const loadStateMessage = computed(() => {
    if (loading.value) return theme.value.forum.loadMore
    if (error.value) return theme.value.forum.loadError
    if (topics.value.length === 0) return 'No Data'
    if (noMore.value) return theme.value.forum.noMore
  })

  function getValidFilter(value?: string): FilterType | null {
    const filter = value || location.hash.slice(1)
    return filterSet.has(filter) ? (filter as FilterType) : null
  }

  watch(
    loading,
    () => {
      topics.value = data.value
    },
    {
      immediate: true,
    },
  )

  watchOnce(
    annLoading,
    () => {
      if (annData.value?.length === 0) return
      topics.value = uniqBy([...(annData.value || []), ...topics.value], 'id')
    },
    {
      immediate: true,
    },
  )

  watch(error, () => {
    toast.error(theme.value.forum.loadError)
  })

  watch(
    () => pagination.sort,
    async () => {
      initialData()
      await refreshData()
    },
  )

  watch(
    () => pagination.filter,
    async () => {
      initialData()
      await refreshData()
    },
  )

  watch(isSearching, async () => {
    if (!isSearching.value) {
      removeQueryParam('q')
      initialData()
      await refreshData()
    }
  })

  watch(lang, async () => {
    initialData()
    await refreshData()
  })

  return {
    // data
    userSubmittedTopic,
    annData,
    topics,

    // state
    loading,
    noMore,
    total,
    totalPage,
    error,
    isSearching,
    ...toRefs(pagination),

    // getters
    loadStateMessage,
    isFirstLoad,
    canLoadMore,

    // actions
    initialData,
    searchTopics,
    switchTopicFilter,
    refreshData,
    loadMore,
    loadAnn,
    submitTopic,
    closeTopic,
    deleteComment,
  }
})

export type FilterType = 'ALL' | 'BUG' | 'FEAT'
