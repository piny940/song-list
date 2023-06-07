import { TestID } from '@/resources/TestID'
import { Video as VideoType } from '@/resources/types'
import Image from 'next/image'
import { styled } from 'styled-components'

const LargeVideoTitleDiv = styled.div`
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 60px;
`
const MediumVideoTitleDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
`

export type VideoProps = {
  video: VideoType
  type: 'large' | 'medium'
}

export const Video: React.FC<VideoProps> = ({ video, type }) => {
  return type === 'large' ? (
    <div
      className="video border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
      style={{ width: '360px', height: '360px' }}
    >
      <LargeVideoTitleDiv className="p-2">{video.title}</LargeVideoTitleDiv>
      <div className="">
        <Image
          src={video.thumbnails.high.url}
          width={360}
          height={270}
          alt="Video thumbnail"
        />
      </div>
    </div>
  ) : (
    <div
      className="video d-flex border border-light shadow-sm m-1"
      style={{ height: '90px' }}
    >
      <Image src={video.thumbnails.medium.url} width={160} height={90} alt="" />
      <MediumVideoTitleDiv className="p-2">
        <span>{video.title}</span>
      </MediumVideoTitleDiv>
    </div>
  )
}
