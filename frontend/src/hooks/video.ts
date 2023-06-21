import { VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { queryToSearchParams } from '@/utils/helpers'
import { usePaginate } from './common'

export const useVideos = ({
  channelId,
  query,
  since,
  until,
  isPaused,
}: {
  channelId?: number
  query?: string
  since?: string
  until?: string
  isPaused?: boolean
}) => {
  const { getPage, setPage } = usePaginate()

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
          count: '10',
          page: String(getPage()),
        }).toString(),
    getData
  )
  return { setPage, getPage, data, error, mutate }
}
