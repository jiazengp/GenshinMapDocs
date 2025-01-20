import type ForumAPI from '@/apis/forum/api'
import { computed } from 'vue'

export const SHARED_TOPIC_INFO_KEY = 'topic-info'

export const useSharedTopicInfo = (topic?: ForumAPI.Topic) => {
  if (import.meta.env.SSR) return computed(() => null)
  const data = sessionStorage.getItem(SHARED_TOPIC_INFO_KEY)

  if (data && topic === undefined) {
    sessionStorage.removeItem(SHARED_TOPIC_INFO_KEY)
    return computed(() => JSON.parse(data))
  }

  if (!topic) return computed(() => null)
  sessionStorage.setItem(SHARED_TOPIC_INFO_KEY, JSON.stringify(topic))
  return computed<ForumAPI.Topic>(() => topic)
}