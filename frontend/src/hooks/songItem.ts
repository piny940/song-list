import { queryToSearchParams } from '@/utils/helpers'
import { useEffect, useMemo, useRef } from 'react'
import { useHold, usePaginate, useSWRWithQuery } from './common'
import { SongItemType } from '@/resources/types'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'

export const useSongItems = (
  {
    query,
    channelId,
    videoId,
    since,
    until,
    videoTitle,
    isPaused,
    count,
  }: {
    query?: string
    channelId?: number
    videoId?: number
    since?: string
    until?: string
    videoTitle?: string
    isPaused?: boolean
    count?: number
  },
  swrConfig?: Partial<PublicConfiguration<any, any, BareFetcher<any>>>
) => {
  const DEFAULT_PAGE = 1
  const { getPage, setPage } = usePaginate(DEFAULT_PAGE)
  const { isReady, updateTimer } = useHold(300)
  const isFirst = useRef(true)

  const queryParams = useMemo(() => {
    return queryToSearchParams({
      query: query || '',
      since: since || '',
      until: until || '',
      video_title: videoTitle || '',
      channel_id: channelId != null ? String(channelId) : '',
      video_id: videoId != null ? String(videoId) : '',
      count: count?.toString() || '15',
      page: String(getPage()),
    }).toString()
  }, [query, since, until, videoTitle, channelId, videoId, count, getPage()])

  const [{ data, error, mutate }, mutateAll] = useSWRWithQuery<{
    song_items: SongItemType[]
    total_pages: number
  }>(isPaused ? undefined : '/song_items?', queryParams, swrConfig)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setPage(DEFAULT_PAGE)
    updateTimer()
  }, [query, since, until, videoTitle])

  return {
    data: isReady ? data : undefined,
    error,
    setPage,
    getPage,
    mutate,
    mutateAll,
  }
}
