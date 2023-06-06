import { TestID } from '@/resources/TestID'
import { Channel } from '@/resources/types'
import { getChannels } from '@/utils/api'
import useSWR from 'swr'

export type ChannelsListProps = {
  testID?: string
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ testID }) => {
  const { data } = useSWR<Channel[]>('/api/channels', getChannels)
  console.log(data)
  return data ? (
    <div className="" data-testid={testID}>
      {data.map((channel) => (
        <div key={channel.id} data-testid={TestID.CHANNEL}>
          {channel.name}
        </div>
      ))}
    </div>
  ) : (
    <div className="">loading</div>
  )
}
