import { SongItem } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'

export type SongItemsProps = {
  videoId?: string
  query?: string
}

export const SongItems: React.FC<SongItemsProps> = ({ videoId, query }) => {
  const { data, error } = useSWR<{ song_items: SongItem[] }>(
    '/song_items?' +
      new URLSearchParams({
        query: query || '',
        video_id: videoId || '',
      }).toString(),
    getData
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="">
      {data.song_items.map((songItem) => (
        <div key={songItem.id}>{songItem.title}</div>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  )
}
