import { queryToSearchParams } from '@/utils/helpers'
import { useEffect, useRef } from 'react'
import { useHold, usePaginate } from './common'
import useSWR from 'swr'
import { SongItemType } from '@/resources/types'
import { getData } from '@/utils/api'

export const useSongItems = ({
  query,
  channelId,
  videoId,
  since,
  until,
  videoTitle,
  isPaused,
}: {
  query?: string
  channelId?: number
  videoId?: number
  since?: string
  until?: string
  videoTitle?: string
  isPaused?: boolean
}) => {
  const DEFAULT_PAGE = 1
  const { getPage, setPage } = usePaginate('song-items-page', DEFAULT_PAGE)
  const { isReady, updateTimer } = useHold(500)
  const isFirst = useRef(true)
  const { data, error, mutate } = useSWR<{
    song_items: SongItemType[]
    total_pages: number
  }>(
    !isPaused &&
      '/song_items?' +
        queryToSearchParams({
          query: query || '',
          since: since || '',
          until: until || '',
          video_title: videoTitle || '',
          channel_id: channelId != null ? String(channelId) : '',
          video_id: videoId != null ? String(videoId) : '',
          count: '15',
          page: String(getPage()),
        }).toString(),
    getData
  )

  useEffect(() => {
    if (isFirst) {
      isFirst.current = false
      return
    }
    setPage(DEFAULT_PAGE)
    updateTimer()
  }, [query, since, until, videoTitle])

  return { data: isReady ? data : undefined, error, setPage, getPage, mutate }
}
