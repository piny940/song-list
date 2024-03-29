import { TestID } from '@/resources/TestID'
import { VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'
import { SongList } from './SongList'
import styles from '@/styles/song-lists.module.scss'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { toVideoDate, toVideoLink } from '@/utils/helpers'
import { YoutubeIcon } from '../Common/YoutubeIcon'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
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
      className="video rounded border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
    >
      <div
        className="d-flex border-0 text-body w-100"
        onClick={toggleSongListOpened}
        role="button"
      >
        <Image
          priority={true}
          src={video.thumbnails.medium.url}
          width={160}
          height={90}
          alt=""
          style={{
            borderTopLeftRadius: 'var(--bs-border-radius)',
            borderBottomLeftRadius: 'var(--bs-border-radius)',
          }}
        />
        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <OneLineDiv className="p-2">
            <h3 className="h6 fw-normal">{video.title}</h3>
          </OneLineDiv>
          <div className="pe-2 text-muted d-flex justify-content-between align-items-end">
            <div className="px-4 pb-1">
              <Link
                href={toVideoLink(video)}
                target="_blank"
                onClick={stopPropagation}
              >
                <YoutubeIcon />
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
