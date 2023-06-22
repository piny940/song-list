import { TestID } from '@/resources/TestID'
import { ChannelType, VideoType } from '@/resources/types'
import Error from 'next/error'
import { Video } from './Video'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { useState } from 'react'
import { useVideos } from '@/hooks/video'

export type VideosProps = {
  channel: ChannelType
  query?: string
  since?: string
  until?: string
  onlySongLives?: boolean
}

export const Videos: React.FC<VideosProps> = ({
  channel,
  query,
  since,
  until,
  onlySongLives,
}) => {
  const [openedVideo, setOpenedVideo] = useState<VideoType | null>(null)
  const { data, error, getPage, setPage } = useVideos({
    channelId: channel.id,
    query,
    since,
    until,
    onlySongLives,
  })

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="videos pb-4" data-testid={TestID.VIDEOS}>
      {data.videos.length > 0 ? (
        <>
          <div className="mb-4">
            {data.videos.map((video) => (
              <Video
                songListOpen={openedVideo?.id === video.id}
                video={video}
                key={video.id}
                toggleSongListOpened={() => {
                  if (openedVideo === video) setOpenedVideo(null)
                  else setOpenedVideo(video)
                }}
              />
            ))}
          </div>
          <Paging
            setPageNumber={setPage}
            totalPages={data.total_pages}
            currentPage={getPage()}
          />
        </>
      ) : (
        <div className="mb-4 text-center">
          条件に合致する歌は見つかりませんでした。
        </div>
      )}
    </div>
  ) : (
    <Loading />
  )
}
