import { SongItemType } from '@/resources/types'
import { ParsedUrlQuery } from 'querystring'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const timeToString = (time: Date) => {
  const hh = ('0' + time.getHours().toString()).slice(-2)
  const mm = ('0' + time.getMinutes().toString()).slice(-2)
  const ss = ('0' + time.getSeconds().toString()).slice(-2)
  return `${hh}:${mm}:${ss}`
}
export const toSongLink = (songItem: SongItemType) => {
  const time = new Date(songItem.time)
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return `https://www.youtube.com/watch?v=${songItem.video.video_id}&t=${
    hour * 3600 + minute * 60 + second
  }`
}
export const queryToSearchParams = (
  query: Record<string, string> | ParsedUrlQuery
) => {
  return new URLSearchParams(query as Record<string, string>)
}
