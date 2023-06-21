import { ChannelType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'

export const useChannels = ({ isPaused }: { isPaused?: boolean }) => {
  const { data, error, mutate } = useSWR<{ channels: ChannelType[] }>(
    !isPaused && '/channels',
    getData
  )
  return { data, error, mutate }
}

export const useChannel = (id: number) => {
  return useSWR<{ channel: ChannelType }>(`/channels/${id}?`, getData)
}
