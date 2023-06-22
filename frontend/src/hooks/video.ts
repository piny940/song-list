import { VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { queryToSearchParams } from '@/utils/helpers'
import { useHold, usePaginate } from './common'
import { useEffect, useRef } from 'react'

export const useVideos = ({
  channelId,
  query,
  since,
  until,
  onlySongLives,
  isPaused,
  holdTime = 0,
}: {
  channelId?: number
  query?: string
  since?: string
  until?: string
  onlySongLives?: boolean
  isPaused?: boolean
  holdTime?: number
}) => {
  const DEFAULT_PAGE = 1
  const { getPage, setPage } = usePaginate(DEFAULT_PAGE)
  const { isReady, updateTimer } = useHold(holdTime)
  const isFirst = useRef(true)

  const { data, error, mutate } = useSWR<{
    videos: VideoType[]
    total_pages: number
  }>(
    !isPaused &&
      `/videos?` +
        queryToSearchParams({
          channel_id: channelId ? String(channelId) : '',
          query: query || '',
          since: since || '',
          until: until || '',
          only_song_lives: onlySongLives ? '1' : '0',
          count: '10',
          page: String(getPage()),
        }).toString(),
    getData
  )

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setPage(DEFAULT_PAGE)
    updateTimer()
  }, [query, since, until, onlySongLives])

  return { setPage, getPage, data: isReady ? data : null, error, mutate }
}
