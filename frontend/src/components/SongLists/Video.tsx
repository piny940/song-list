import { TestID } from '@/resources/TestID'
import { VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'
import { SongList } from './SongList'

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
  const toVideoTime = (publishedAt: string) => {
    const time = new Date(publishedAt)
    if (!time) return ''
    return `${time.getFullYear()}/${time.getMonth()}/${time.getDate()}`
  }

  return (
    <div
      className="video  border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
    >
      <a
        className="d-flex text-body"
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
        <div className="d-flex flex-column justify-content-between">
          <OneLineDiv className="p-2">
            <span>{video.title}</span>
          </OneLineDiv>
          <div className="pe-2 text-muted d-flex flex-row-reverse">
            <span>{toVideoTime(video.published_at)}</span>
          </div>
        </div>
      </a>
      {songListOpen && <SongList video={video} />}
    </div>
  )
}
