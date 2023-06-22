import { SongDiffType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'

export const useSongDiffs = ({
  songItemId,
  isPaused,
}: {
  songItemId: number
  isPaused?: boolean
}) => {
  const { data, error, mutate } = useSWR<{ song_diffs: SongDiffType[] }>(
    !isPaused && `/member/song_items/${songItemId}/song_diffs`,
    getData
  )
  return { data, error, mutate }
}
