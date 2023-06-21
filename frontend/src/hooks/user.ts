import { UserType } from '@/resources/types'
import { getData } from '@/utils/api'
import useSWR from 'swr'

export const useUser = () => {
  const { data, error, mutate } = useSWR<{ user: UserType }>('/user', getData)

  return { data, error, mutate }
}
