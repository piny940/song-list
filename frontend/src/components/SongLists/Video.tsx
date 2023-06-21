import { TestID } from '@/resources/TestID'
import { VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'
import { SongList } from './SongList'
import styles from '../../styles/song-lists.module.scss'
import Link from 'next/link'
import { YOUTUBE_URL } from '@/utils/constants'
import { MouseEventHandler } from 'react'
import { toVideoDate } from '@/utils/helpers'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
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

export type VideoProps = {
  video: VideoType
  songListOpen: boolean
  toggleSongListOpened: () => void
}

export const Video: React.FC<VideoProps> = ({
  video,
  songListOpen,
  toggleSongListOpened,
}) => {
  const stopPropagation: MouseEventHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className="video  border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
    >
      <div
        className="d-flex text-body w-100"
        onClick={toggleSongListOpened}
        role="button"
      >
        <Image
          priority={true}
          src={video.thumbnails.medium.url}
          width={160}
          height={90}
          alt=""
        />
        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <OneLineDiv className="p-2">
            <span>{video.title}</span>
          </OneLineDiv>
          <div className="pe-2 text-muted d-flex justify-content-between align-items-end">
            <div className="px-4 pb-1">
              <Link
                href={`${YOUTUBE_URL}/watch?v=${video.video_id}`}
                target="_blank"
                onClick={stopPropagation}
              >
                <YoutubeIcon role="button" className="d-inline-block" />
              </Link>
            </div>
            <span>{toVideoDate(video.published_at)}</span>
          </div>
        </div>
      </div>
      <div
        className={`${styles.collapsable} ${songListOpen ? styles.active : ''}`}
      >
        {songListOpen && <SongList video={video} />}
      </div>
    </div>
  )
}
