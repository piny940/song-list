import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'

export type SongItemProps = {
  songItem: SongItemType
}

export const SongItem: React.FC<SongItemProps> = ({ songItem }) => {
  return (
    <div className="" data-testid={TestID.SONG_ITEM}>
      {songItem.title}
    </div>
  )
}
