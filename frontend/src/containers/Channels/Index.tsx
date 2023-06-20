import { Channels } from '@/components/SongLists/Channels'
import { useChannels } from '@/hooks/channel'

export const ChannelsIndex: React.FC = () => {
  const { data } = useChannels({})

  return (
    <div className="">
      <h1>チャンネル一覧</h1>
      <Channels channels={data?.channels} link="/channels" testID="channels" />
    </div>
  )
}
