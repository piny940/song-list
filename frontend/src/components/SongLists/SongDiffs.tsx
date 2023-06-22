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
      <div className="mb-4">
        {data.song_diffs.map((songDiff) => (
          <div className="" key={songDiff.id}>
            <SongDiff songDiff={songDiff} />
          </div>
        ))}
      </div>
      <Paging
        totalPages={data.total_pages}
        currentPage={getPage()}
        setPageNumber={setPage}
      />
    </div>
  ) : (
    <Loading />
  )
}
