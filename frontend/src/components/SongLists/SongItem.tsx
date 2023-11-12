import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { toSongLink } from '@/utils/helpers'
import Link from 'next/link'
import { styled } from 'styled-components'
import { YoutubeIcon } from '../Common/YoutubeIcon'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 23px;
`

export type SongItemProps = {
  songItem: SongItemType
}

export const SongItem: React.FC<SongItemProps> = ({ songItem }) => {
  return (
    <Link
      className="unstyled"
      href={toSongLink(songItem)}
      target="_blank"
      title="Youtubeで視聴"
    >
      <div
        className="d-flex align-items-center border border-light rounded shadow-sm m-1 p-3"
        data-testid={TestID.SONG_ITEM}
      >
        <span className="flex-shrink-0 d-flex align-items-center">
          <YoutubeIcon />
        </span>
        <div className="">
          <span className="ms-2">{songItem.time}</span>
        </div>
        <div className="d-flex flex-wrap">
          <OneLineDiv className="">
            <span className="ms-2">{songItem.title}</span>
          </OneLineDiv>
          {songItem.author && (
            <OneLineDiv>
              <span className="ms-3">/ {songItem.author}</span>
            </OneLineDiv>
          )}
        </div>
      </div>
    </Link>
  )
}
