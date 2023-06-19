import { ChannelType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import { usePaginate } from './common'
import useSWR from 'swr'
import { queryToSearchParams } from '@/utils/helpers'

export const useVideos = ({
  channel,
  query,
  since,
  until,
}: {
  channel?: ChannelType
  query?: string
  since?: string
  until?: string
}) => {
  const { getPage, setPage } = usePaginate('videos-page')

  const { data, error, mutate } = useSWR<{
    videos: VideoType[]
    total_pages: number
  }>(
    `/channels/${channel?.id || ''}/videos?` +
      queryToSearchParams({
        query: query || '',
        since: since || '',
        until: until || '',
        count: '10',
        page: String(getPage()),
      }).toString(),
    getData,
    {
      isPaused: () => channel == null,
    }
  )
  return { setPage, getPage, data, error, mutate }
}
