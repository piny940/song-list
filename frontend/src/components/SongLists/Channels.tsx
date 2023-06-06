import { Channel as ChannelType } from '@/resources/types'
import { getChannels } from '@/utils/api'
import useSWR from 'swr'
import { Channel } from './Channel'

export type ChannelsListProps = {
  testID?: string
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ testID }) => {
  const { data } = useSWR<ChannelType[]>('/api/channels', getChannels)

  return data ? (
    <div className="" data-testid={testID}>
      {data.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </div>
  ) : (
    <div className="">loading</div>
  )
}
