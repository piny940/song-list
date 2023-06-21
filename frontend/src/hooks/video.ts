import { ChannelType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { queryToSearchParams } from '@/utils/helpers'
import { usePaginate } from './common'

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
  const { getPage, setPage } = usePaginate()

  const { data, error, mutate } = useSWR<{
    videos: VideoType[]
    total_pages: number
  }>(
    channel &&
      `/channels/${channel.id || ''}/videos?` +
        queryToSearchParams({
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
