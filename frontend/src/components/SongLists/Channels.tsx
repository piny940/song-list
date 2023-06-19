import { ChannelType } from '@/resources/types'
import { Channel } from './Channel'
import { Loading } from '../Common/Loading'

export type ChannelsProps = {
  testID?: string
  link: string
  channels: ChannelType[] | undefined
}

export const Channels: React.FC<ChannelsProps> = ({
  testID,
  link,
  channels,
}) => {
  return channels ? (
    <div
      className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4"
      data-testid={testID}
    >
      {channels.map((channel) => (
        <div className="col" key={channel.id}>
          <Channel link={link} channel={channel} />
        </div>
      ))}
    </div>
  ) : (
    <div className="m-4">
      <Loading />
    </div>
  )
}
