import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
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

  return data ? (
    <div className="">
      <div className="mb-4" data-testid={TestID.SONG_ITEMS}>
        {data.song_items.map((songItem) => (
          <div key={songItem.id}>
            <SongItem songItem={songItem} />
          </div>
        ))}
      </div>
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
