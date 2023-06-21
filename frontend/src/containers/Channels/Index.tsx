import { Channels } from '@/components/SongLists/Channels'

export const ChannelsIndex: React.FC = () => {
  return (
    <div className="channels-index">
      <h1>チャンネル一覧</h1>
      <Channels link="/channels" testID="channels" />
    </div>
  )
}
