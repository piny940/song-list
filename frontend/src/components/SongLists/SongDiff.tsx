import { SongDiffType } from '@/resources/types'

export type SongDiffProps = {
  songDiff: SongDiffType
}

export const SongDiff: React.FC<SongDiffProps> = ({ songDiff }) => {
  return <div className="">{songDiff.title}</div>
}
