import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { SongItem } from './SongItem'
import { Loading } from '../Common/Loading'
import { useEffect, useState } from 'react'
import { Paging } from '../Common/Paging'

export type SongItemsProps = {
  videoId?: string
  query?: string
}

const DEFAULT_PAGE = 1
export const SongItems: React.FC<SongItemsProps> = ({ videoId, query }) => {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const { data, error } = useSWR<{
    song_items: SongItemType[]
    total_pages: number
  }>(
    '/song_items?' +
      new URLSearchParams({
        query: query || '',
        video_id: videoId || '',
        count: '15',
        page: String(page),
      }).toString(),
    getData
  )
  useEffect(() => {
    setPage(DEFAULT_PAGE)
  }, [query])

  if (error) return <Error statusCode={404} />

  const videos: { [videoId in string]: VideoType } = {}
  const songItems: { [videoId in string]: SongItemType[] } = {}
  for (const song of data?.song_items || []) {
    const videoId = song.video.video_id
    if (!Object.keys(videos).includes(videoId)) {
      videos[videoId] = song.video
      songItems[videoId] = [song]
    } else {
      songItems[videoId].push(song)
    }
  }

  return data ? (
    <div className="">
      {Object.values(videos).map((video) => (
        <div className="" key={video.video_id}>
          {video.title}
          <div className="mb-4" data-testid={TestID.SONG_ITEMS}>
            {songItems[video.video_id].map((songItem) => (
              <div key={songItem.id}>
                <SongItem songItem={songItem} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <Paging
        currentPage={page}
        totalPages={data.total_pages}
        setPageNumber={setPage}
      />
    </div>
  ) : (
    <Loading />
  )
}
