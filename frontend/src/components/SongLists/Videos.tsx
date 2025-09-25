import { TestID } from '@/resources/TestID'
import { VideoType } from '@/resources/types'
import Error from 'next/error'
import { Video } from './Video'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { useState } from 'react'
import { useVideos } from '@/hooks/video'

export type VideosProps = {
  channelId: number
  query?: string
  since?: Date | null
  until?: Date | null
  onlySongLives?: boolean
}

export const Videos: React.FC<VideosProps> = ({
  channelId,
  query,
  since,
  until,
  onlySongLives,
}) => {
  const [openedVideo, setOpenedVideo] = useState<VideoType | null>(null)
  const { data, error, getPage, setPage } = useVideos({
    channelId: channelId,
    query,
    since,
    until,
    onlySongLives,
    holdTime: 300,
  })

  if (error) return <Error statusCode={404} />

  return data
    ? (
        <div className="videos pb-4" data-testid={TestID.VIDEOS}>
          {data.videos.length > 0
            ? (
                <>
                  <ul className="mb-4 list-unstyled">
                    {data.videos.map(video => (
                      <li key={video.id}>
                        <Video
                          songListOpen={openedVideo?.id === video.id}
                          video={video}
                          toggleSongListOpened={() => {
                            if (openedVideo === video) setOpenedVideo(null)
                            else setOpenedVideo(video)
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <Paging
                    setPageNumber={setPage}
                    totalPages={data.total_pages}
                    currentPage={getPage()}
                  />
                </>
              )
            : (
                <div className="mb-4 text-center">
                  条件に合致する歌は見つかりませんでした。
                </div>
              )}
        </div>
      )
    : (
        <Loading />
      )
}
