import { TestID } from '@/resources/TestID'
import { VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'

const MediumVideoTitleDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
`

export type VideoProps = {
  video: VideoType
}

export const Video: React.FC<VideoProps> = ({ video }) => {
  const toVideoTime = (publishedAt: string) => {
    const time = new Date(publishedAt)
    if (!time) return ''
    return `${time.getFullYear()}/${time.getMonth()}/${time.getDate()}`
  }
  return (
    <div
      className="video d-flex border border-light shadow-sm m-1"
      style={{ height: '90px' }}
      data-testid={TestID.VIDEO}
    >
      <Image src={video.thumbnails.medium.url} width={160} height={90} alt="" />
      <div className="d-flex flex-column justify-content-between">
        <MediumVideoTitleDiv className="p-2">
          <span>{video.title}</span>
        </MediumVideoTitleDiv>
        <div className="pe-2 text-muted d-flex flex-row-reverse">
          <span>{toVideoTime(video.published_at)}</span>
        </div>
      </div>
    </div>
  )
}
