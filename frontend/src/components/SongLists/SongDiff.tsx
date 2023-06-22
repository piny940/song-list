import { TestID } from '@/resources/TestID'
import { SongDiffType } from '@/resources/types'

export type SongDiffProps = {
  songDiff: SongDiffType
}

export const SongDiff: React.FC<SongDiffProps> = ({ songDiff }) => {
  return (
    <div className="" data-testid={TestID.SONG_DIFF}>
      {songDiff.title}
    </div>
  )
}
