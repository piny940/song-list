import { Channel, Video } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'

export type VideosProps = {
  channel: Channel
}

export const Videos: React.FC<VideosProps> = ({ channel }) => {
  const { data, error } = useSWR<{ videos: Video[] }>(
    `/channels/${channel.id}`,
    getData
  )
  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="videos">
      {data.videos.map((video) => (
        <div className="" key={video.id}>
          {video.title}
        </div>
      ))}
    </div>
  ) : (
    <div className="">loading...</div>
  )
}
