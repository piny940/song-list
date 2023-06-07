import { Channel } from '@/resources/types'
import { fetchApi } from './common'

export const getChannels = async () => {
  const response = await fetchApi({
    url: '/channels',
    method: 'GET',
  })
  const json = await response.json()
  return json.channels as Channel[]
}
