import { TestID } from '@/resources/TestID'
import { Video as VideoType } from '@/resources/types'
import Image from 'next/image'

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
    <div
      className="video border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
      style={{ ...size }}
    >
      <div className="">
        <Image
          src={video.thumbnails.high.url}
          width={360}
          height={270}
          alt="Video thumbnail"
        />
      </div>
    </div>
  )
}
