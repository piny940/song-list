import { ChannelsList } from '@/components/SongLists/Channels'

export const ChannelsIndex: React.FC = () => {
  return (
    <div className="">
      <h1>チャンネル一覧</h1>
      <ChannelsList testID="channels" />
    </div>
  )
}
