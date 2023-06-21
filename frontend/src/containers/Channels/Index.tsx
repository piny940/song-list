import { Channels } from '@/components/SongLists/Channels'
import { TestID } from '@/resources/TestID'

export const ChannelsIndex: React.FC = () => {
  return (
    <div className="channels-index" data-testid={TestID.CHANNELS_INDEX}>
      <h1>チャンネル一覧</h1>
      <Channels link="/channels" testID="channels" />
    </div>
  )
}
