import { ChannelType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'

export const useChannels = () => {
  const { data, error, mutate } = useSWR<{ channels: ChannelType[] }>(
    '/channels',
    getData
  )
  return { data, error, mutate }
}
