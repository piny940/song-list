import { TestID } from '@/resources/TestID'
import { SongDiffType } from '@/resources/types'
import { styled } from 'styled-components'

const CircleSpan = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 4px 0;
  border-radius: 50%;
`

export type SongDiffProps = {
  songDiff: SongDiffType
}

export const SongDiff: React.FC<SongDiffProps> = ({ songDiff }) => {
  const createdAt = new Date(songDiff.created_at)
  return (
    <div
      className="m-2 p-2 shadow-sm rounded border-light border"
      data-testid={TestID.SONG_DIFF}
    >
      <small className="text-gray">
        <span>
          {`${createdAt.getFullYear()}年${
            createdAt.getMonth() + 1
          }月${createdAt.getDate()}日`}
        </span>
        <span className="ms-2">{songDiff.made_by?.name}</span>
      </small>
      <div className="d-flex">
        <CircleSpan className="bg-danger ms-3"></CircleSpan>
        <span className="ms-1">{songDiff.time}</span>
        <span className="ms-3">{songDiff.title}</span>
        <span className="mx-3">{songDiff.author}</span>
      </div>
      <div className="d-flex">
        <span>&rarr;</span>
        <CircleSpan className="bg-success ms-3"></CircleSpan>
        <span className="ms-1">{songDiff.time}</span>
        <span className="ms-3">{songDiff.title}</span>
        <span className="mx-3">{songDiff.author}</span>
      </div>
    </div>
  )
}
