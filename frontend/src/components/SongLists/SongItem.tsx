import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { timeToString, toSongLink } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { styled } from 'styled-components'

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
  const time = new Date(songItem.time)

  return (
    <Link href={toSongLink(songItem)} target="_blank" title="Youtubeで視聴">
      <div
        className="d-flex align-items-center border border-light rounded shadow-sm m-1 p-3"
        data-testid={TestID.SONG_ITEM}
      >
        <div className="">
          <span className="">
            <div className="d-flex align-items-center">
              <Image
                src="/images/youtube.svg"
                width={22}
                height={22}
                alt="youtube icon"
              />
              <span className="ms-2">{timeToString(time)}</span>
            </div>
          </span>
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
