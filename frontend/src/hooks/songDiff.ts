import { SongDiffType, SongItemType } from '@/resources/types'
import { getData } from '@/utils/api'
import { queryToSearchParams } from '@/utils/helpers'
import useSWR from 'swr'

export const useSongDiffs = ({
  songItem,
  isPaused,
}: {
  songItem?: SongItemType
  isPaused?: boolean
}) => {
  const { data, error, mutate } = useSWR<{ song_diffs: SongDiffType[] }>(
    !isPaused &&
      `/member/song_diffs?${queryToSearchParams({
        song_item_id: songItem ? String(songItem?.id) : '',
      }).toString()}`,
    getData
  )
  return { data, error, mutate }
}
