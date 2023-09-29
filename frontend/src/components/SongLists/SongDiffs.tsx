import { useSongDiffs } from '@/hooks/songDiff'
import { SongItemType } from '@/resources/types'
import Error from 'next/error'
import { Loading } from '../Common/Loading'
import { SongDiff } from './SongDiff'
import { Paging } from '../Common/Paging'

export type SongDiffsProps = {
  songItem: SongItemType
}

export const SongDiffs: React.FC<SongDiffsProps> = ({ songItem }) => {
  const { data, error, getPage, setPage } = useSongDiffs({
    songItemId: songItem.id,
  })

  if (error) return <Error statusCode={400} />
  return data ? (
    <div className="song-diffs">
      <ul className="mb-4 list-unstyled">
        {data.song_diffs.map((songDiff, i) => (
          <li className="" key={songDiff.id}>
            <SongDiff
              songDiff={songDiff}
              lastSongDiff={
                i < data.song_diffs.length - 1
                  ? data.song_diffs[i + 1]
                  : data.next_song_diff
              }
            />
          </li>
        ))}
      </ul>
      {data.total_pages > 1 && (
        <Paging
          totalPages={data.total_pages}
          currentPage={getPage()}
          setPageNumber={setPage}
        />
      )}
    </div>
  ) : (
    <Loading />
  )
}
