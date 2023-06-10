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
}

export const Videos: React.FC<VideosProps> = ({ channel }) => {
  const { getPage, setPage } = usePaginate('videos-page')
  const [openedVideo, setOpenedVideo] = useState<VideoType | null>(null)

  const { data, error } = useSWR<{ videos: VideoType[]; total_pages: number }>(
    `/channels/${channel.id}/videos?` +
      queryToSearchParams({
        count: '10',
        page: String(getPage()),
      }).toString(),
    getData
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="">
      <div className="videos mb-4" data-testid={TestID.VIDEOS}>
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
    </div>
  ) : (
    <Loading />
  )
}
