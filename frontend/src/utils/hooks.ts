import { useRouter } from 'next/router'
import { queryToSearchParams } from './helpers'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { SongItemType } from '@/resources/types'
import { getData } from './api'

export const usePaginate = (key: string, defaultPage = 1) => {
  const router = useRouter()
  const getPage = () => {
    return Number(router.query[key] || defaultPage)
  }
  const setPage = (newPage: number) => {
    router.query[key] = String(newPage)
    void router.push(
      `${router.pathname}?${queryToSearchParams(router.query).toString()}`,
      undefined,
      { scroll: false }
    )
  }

  return { getPage, setPage }
}

export const useHold = (timer: number) => {
  const [isReady, setIsReady] = useState(true)
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)

  const updateTimer = () => {
    console.log(timeoutId)
    if (timeoutId) clearTimeout(timeoutId)
    setIsReady(false)

    setTimeoutId(
      setTimeout(() => {
        setIsReady(true)
      }, timer)
    )
  }
  return { isReady, updateTimer }
}

export const useSongItems = ({
  query,
  channelId,
  videoId,
  since,
  until,
  videoTitle,
}: {
  query: string
  channelId: string
  videoId: string
  since: string
  until: string
  videoTitle: string
}) => {
  const DEFAULT_PAGE = 1
  const { getPage, setPage } = usePaginate('song-items-page', DEFAULT_PAGE)
  const { isReady, updateTimer } = useHold(500)
  const isFirst = useRef(true)
  const { data, error } = useSWR<{
    song_items: SongItemType[]
    total_pages: number
  }>(
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

  return { data: isReady ? data : undefined, error }
}
