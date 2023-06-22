import { SongItemType } from '@/resources/types'
import { queryToSearchParams } from '@/utils/helpers'
import useSWR from 'swr'

export const useSongDiffs = ({
  songItem,
  isPaused,
}: {
  songItem?: SongItemType
  isPaused?: boolean
}) => {
  const { data, error, mutate } = useSWR(
    !isPaused &&
      `/song_diffs?${queryToSearchParams({
        song_item_id: songItem ? String(songItem?.id) : '',
      }).toString()}`
  )
  return { data, error, mutate }
}
