import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { stopPropagation, timeToString, toSongLink } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { styled } from 'styled-components'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 23px;
`
const YoutubeIcon = styled.span`
  width: 22px;
  height: 22px;
  background-image: url('/images/youtube.svg');
  background-size: contain;

  &:hover {
    background-image: url('/images/youtube-red.svg');
  }
`

export type SongItemProps = {
  songItem: SongItemType
  isLink: boolean
  onClick?: MouseEventHandler
}

export const SongItem: React.FC<SongItemProps> = ({
  songItem,
  isLink,
  onClick,
}) => {
  const time = new Date(songItem.time)

  const renderContent = () => {
    return (
      <div
        className="d-flex align-items-center border border-light rounded shadow-sm m-1 p-3"
        data-testid={TestID.SONG_ITEM}
      >
        {isLink ? (
          <Image
            src="/images/youtube.svg"
            width={22}
            height={22}
            alt="Youtube icon"
          />
        ) : (
          <Link
            href={toSongLink(songItem)}
            target="_blank"
            onClick={stopPropagation}
            className="d-flex align-items-center"
          >
            <YoutubeIcon role="button" className="d-inline-block" />
          </Link>
        )}
        <div className="">
          <span className="ms-2">{timeToString(time)}</span>
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
    )
  }
  return isLink ? (
    <Link href={toSongLink(songItem)} target="_blank" title="Youtubeで視聴">
      {renderContent()}
    </Link>
  ) : onClick ? (
    <a role="button">{renderContent()}</a>
  ) : (
    <div className="" onClick={onClick}>
      {renderContent()}
    </div>
  )
}
