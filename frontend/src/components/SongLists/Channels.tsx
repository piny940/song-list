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
    <div
      className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4"
      data-testid={testID}
    >
      {data.map((channel) => (
        <div className="col" key={channel.id}>
          <Channel channel={channel} />
        </div>
      ))}
    </div>
  ) : (
    <div className="">loading</div>
  )
}
