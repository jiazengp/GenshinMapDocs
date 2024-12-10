import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import { useUrlSearchParams } from '@vueuse/core'
import type ForumAPI from '@/apis/forum/api'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
const locales = {
  root: 'zh-cn',
  en: 'en',
  ja: 'ja',
}

let currentLocale: string | null = null

/**
 * Formats a given date according to the specified locale.
 * @param givenDate - The date to format, can be a Date object or a string.
 * @param locale - The locale to use for formatting.
 * @returns A formatted string representing the date.
 */
export function formatDate(givenDate: Date | string, locale: string): string {
  const date = dayjs(givenDate)

  if (currentLocale !== locale) {
    // @ts-ignore
    dayjs.locale(locales[locale])
    currentLocale = locale
  }

  const now = dayjs()
  const diffInMinutes = now.diff(date, 'minute')

  if (diffInMinutes < 720) return date.fromNow()
  if (date.year() === now.year()) return date.format('MM/DD HH:mm')

  return date.format('YYYY/MM/DD HH:mm')
}

export function transformLabelsToArray(labels: GITEE.IssueLabel[]) {
  const arr: string[] = []
  labels.map((val) => arr.push(val.name))

  return arr
}

export function getIssueInfoFromSession(): ForumAPI.Topic | null {
  const issueInfo = sessionStorage.getItem('issue-info')
  sessionStorage.removeItem('issue-info')
  return issueInfo ? JSON.parse(issueInfo) : null
}

export function replaceAtMentions(text: string): string {
  const regex = /@([a-zA-Z0-9]+)(?=\s|$)/g

  if (regex.exec(text) == null) return text

  return text.replaceAll(regex, (match, p1) => {
    return `<a class="vp-link" href="https://gitee.com/${encodeURIComponent(p1)}" target="${p1}">@${p1}</a>`
  })
}

export function getIssueNumberFromUrlSearchParamsWithData(): string {
  const { number } = useUrlSearchParams('history')
  if (typeof number !== 'string') location.href = '../error.html'
  return String(number)
}

export function setPageTitle(newTitle: string = '', prefix?: string): void {
  const title = document.title.split('|')
  document.title = `${prefix ? `${prefix} -` : ''} ${newTitle} | ${title[1]}`
}

type DataNode = {
  text: string
  link?: string
  items?: DataNode[]
}

type FlattenedNode = {
  text: string
  link: string
  tag: string
}

export function flattenWithTags(
  nodes: DataNode[],
  topLevelText?: string,
): FlattenedNode[] {
  const result: FlattenedNode[] = []

  nodes.forEach((node) => {
    const currentTopLevelText = topLevelText || node.text

    if (node.link) {
      result.push({
        text: node.text,
        link: node.link,
        tag: currentTopLevelText,
      })
    }
    if (node.items) {
      result.push(...flattenWithTags(node.items, currentTopLevelText))
    }
  })

  return result
}

export function getRandomElements<T>(arr: T[], count: number): T[] {
  if (count >= arr.length) {
    return [...arr]
  }

  const copyArr = [...arr]
  const result: T[] = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArr.length)
    result.push(copyArr[randomIndex])
    copyArr.splice(randomIndex, 1)
  }

  return result
}

export function getPageHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  )
}