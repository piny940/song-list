import { TestID } from '@/resources/TestID'
import { ChannelType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { Video } from './Video'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { usePaginate } from '@/utils/hooks'
import { useState } from 'react'
import { queryToSearchParams } from '@/utils/helpers'

export type VideosProps = {
  channel: ChannelType
  query?: string
  since?: string
  until?: string
}

export const Videos: React.FC<VideosProps> = ({
  channel,
  query,
  since,
  until,
}) => {
  const { getPage, setPage } = usePaginate('videos-page')
  const [openedVideo, setOpenedVideo] = useState<VideoType | null>(null)

  const { data, error } = useSWR<{ videos: VideoType[]; total_pages: number }>(
    `/channels/${channel.id}/videos?` +
      queryToSearchParams({
        query: query || '',
        since: since || '',
        until: until || '',
        count: '10',
        page: String(getPage()),
      }).toString(),
    getData
  )

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
