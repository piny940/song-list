import { TestID } from '@/resources/TestID'
import { Channel, Video as VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { Video } from './Video'

export type VideosProps = {
  channel: Channel
}

export const Videos: React.FC<VideosProps> = ({ channel }) => {
  const { data, error } = useSWR<{ videos: VideoType[] }>(
    `/channels/${channel.id}/videos`,
    getData
  )
  if (error) return <Error statusCode={404} />
  console.log(data)
  return data ? (
    <div className="videos" data-testid={TestID.VIDEOS}>
      {data.videos.map((video) => (
        <div className="" key={video.id}>
          <Video video={video} />
        </div>
      ))}
    </div>
  ) : (
    <div className="">loading...</div>
  )
}
