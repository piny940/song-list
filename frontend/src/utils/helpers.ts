import { SongItemType, VideoType } from '@/resources/types'
import { ParsedUrlQuery } from 'querystring'
import { YOUTUBE_URL } from '../resources/constants'
import { MouseEventHandler } from 'react'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const toSongLink = (songItem: SongItemType) => {
  const time = songItem.time
  const hour = parseInt(time.slice(0, 2))
  const minute = parseInt(time.slice(3, 5))
  const second = parseInt(time.slice(6, 8))

  return `${YOUTUBE_URL}/watch?v=${songItem.video.video_id}&t=${
    hour * 3600 + minute * 60 + second
  }`
}
export const toVideoLink = (video: VideoType) =>
  `${YOUTUBE_URL}/watch?v=${video.video_id}`

export const toVideoDate = (publishedAt: string) => {
  const time = new Date(publishedAt)
  if (!time) return ''
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`
}
export const queryToSearchParams = (
  query: Record<string, string> | ParsedUrlQuery
) => {
  return new URLSearchParams(query as Record<string, string>)
}
export const stopPropagation: MouseEventHandler = (e) => e.stopPropagation()

export const isMobile = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(max-device-width: 640px)').matches
