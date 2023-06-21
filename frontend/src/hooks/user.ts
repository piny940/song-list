import { UserType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'

export const useUser = (
  swrConfig?: Partial<
    PublicConfiguration<
      { user: UserType },
      any,
      BareFetcher<{ user: UserType }>
    >
  >
) => {
  const { data, error, mutate } = useSWR<{ user: UserType }>(
    '/user',
    getData,
    swrConfig
  )

  return { data, error, mutate }
}
