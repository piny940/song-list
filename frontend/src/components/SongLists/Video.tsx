import { TestID } from '@/resources/TestID'
import { Video as VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'

const VideoDiv = styled.div``

const VideoTitleDiv = styled.div`
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 60px;
`

export type VideoProps = {
  video: VideoType
  type: 'large' | 'medium'
}

export const Video: React.FC<VideoProps> = ({ video, type }) => {
  const size =
    type === 'large'
      ? { width: '360px', height: '360px' }
      : { width: '300px', height: '100px' }

  return (
    <VideoDiv
      className="video border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
      style={{ ...size }}
    >
      <VideoTitleDiv className="p-2">{video.title}</VideoTitleDiv>
      <div className="">
        <Image
          src={video.thumbnails.high.url}
          width={360}
          height={270}
          alt="Video thumbnail"
        />
      </div>
    </VideoDiv>
  )
}
