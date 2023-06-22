import { SongDiffType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'

export const useSongDiffs = (
  {
    songItemId,
    isPaused,
  }: {
    songItemId: number
    isPaused?: boolean
  },
  swrConfig?: Partial<PublicConfiguration<any, any, BareFetcher<any>>>
) => {
  const { data, error, mutate } = useSWR<{ song_diffs: SongDiffType[] }>(
    !isPaused && `/member/song_items/${songItemId}/song_diffs`,
    getData,
    swrConfig
  )
  return { data, error, mutate }
}
