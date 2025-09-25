import { SongDiffType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'
import { usePaginate } from './common'
import { queryToSearchParams } from '@/utils/helpers'

export const useSongDiffs = (
  {
    songItemId,
    isPaused,
  }: {
    songItemId: number
    isPaused?: boolean
  },
  swrConfig?: Partial<PublicConfiguration<any, any, BareFetcher<any>>>,
) => {
  const { getPage, setPage } = usePaginate()
  const { data, error, mutate } = useSWR<{
    song_diffs: SongDiffType[]
    next_song_diff: SongDiffType
    total_pages: number
  }>(
    !isPaused
    && `/member/song_items/${songItemId}/song_diffs?`
    + queryToSearchParams({
      count: '7',
      page: String(getPage()),
    }).toString(),
    getData,
    swrConfig,
  )
  return { data, error, mutate, getPage, setPage }
}
