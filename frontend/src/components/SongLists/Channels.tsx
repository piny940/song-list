import { Channel } from './Channel'
import { Loading } from '../Common/Loading'
import { useChannels } from '@/hooks/channel'

export type ChannelsProps = {
  testID?: string
  link: string
}

export const Channels: React.FC<ChannelsProps> = ({ testID, link }) => {
  const { data } = useChannels({})

  return data ? (
    <div
      className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4"
      data-testid={testID}
    >
      {data.channels.map((channel) => (
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
