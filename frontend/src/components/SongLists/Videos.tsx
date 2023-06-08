import { TestID } from '@/resources/TestID'
import { ChannelType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { Video } from './Video'
import { Loading } from '../Common/Loading'

export type VideosProps = {
  channel: ChannelType
  type: 'large' | 'medium'
}

export const Videos: React.FC<VideosProps> = ({ channel, type }) => {
  const { data, error } = useSWR<{ videos: VideoType[] }>(
    `/channels/${channel.id}/videos`,
    getData
  )
  if (error) return <Error statusCode={404} />

  return data ? (
    type === 'large' ? (
      <div
        className="videos row row-cols-lg-2 row-cols-xl-3"
        data-testid={TestID.VIDEOS}
      >
        {data.videos.map((video) => (
          <div className="" key={video.id}>
            <Video type={type} video={video} />
          </div>
        ))}
      </div>
    ) : (
      <div className="videos" data-testid={TestID.VIDEOS}>
        {data.videos.map((video) => (
          <div className="" key={video.id}>
            <Video type={type} video={video} />
          </div>
        ))}
      </div>
    )
  ) : (
    <Loading />
  )
}
