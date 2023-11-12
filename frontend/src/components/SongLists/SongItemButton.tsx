import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { stopPropagation, toSongLink } from '@/utils/helpers'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { styled } from 'styled-components'
import { YoutubeIcon } from '../Common/YoutubeIcon'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 23px;
`

export type SongItemButtonProps = {
  songItem: SongItemType
  onClick: MouseEventHandler
}

export const SongItemButton: React.FC<SongItemButtonProps> = ({
  songItem,
  onClick,
}) => {
  return (
    <button className="w-100 d-block" onClick={onClick}>
      <div
        className="d-flex align-items-center border border-light rounded shadow-sm m-1 p-3"
        data-testid={TestID.SONG_ITEM}
      >
        <span className="flex-shrink-0 d-flex align-items-center">
          <Link
            href={toSongLink(songItem)}
            target="_blank"
            onClick={stopPropagation}
            className="d-flex align-items-center unstyled"
          >
            <YoutubeIcon />
          </Link>
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
    </button>
  )
}
