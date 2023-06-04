import { ListItemButton } from '@/components/Common/ListItemButton'
import { TestID } from '@/resources/TestID'

export const Home: React.FC = () => {
  return (
    <div className="" data-testid={TestID.HOME}>
      <h1>歌枠データベース</h1>
      <div className="list-group">
        <ListItemButton href="/channels" testID={TestID.HOME_CHANNELS_BUTTON}>
          チャンネルから検索
        </ListItemButton>
      </div>
    </div>
  )
}
