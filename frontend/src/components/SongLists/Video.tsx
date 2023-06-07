import { Video as VideoType } from '@/resources/types'

export type VideoProps = {
  video: VideoType
}

export const Video: React.FC<VideoProps> = ({ video }) => {
  return <div className="video">{video.title}</div>
}
