import { TestID } from '@/resources/TestID'
import { ChannelType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { Video } from './Video'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { usePaginate } from '@/utils/hooks'

export type VideosProps = {
  channel: ChannelType
}

export const Videos: React.FC<VideosProps> = ({ channel }) => {
  const { getPage, setPage } = usePaginate('videos-page')

  const { data, error } = useSWR<{ videos: VideoType[]; total_pages: number }>(
    `/channels/${channel.id}/videos?` +
      new URLSearchParams({
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
          <div className="" key={video.id}>
            <Video video={video} />
          </div>
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
