import { useRouter } from 'next/router'
import { queryToSearchParams } from './helpers'

export const usePaginate = (key: string, defaultPage = 1) => {
  const router = useRouter()
  const getPage = () => {
    return Number(router.query[key] || defaultPage)
  }
  const setPage = (newPage: number) => {
    router.query[key] = String(newPage)
    void router.push(
      `${router.pathname}?${queryToSearchParams(router.query).toString()}`,
      undefined,
      { scroll: false }
    )
  }

  return { getPage, setPage }
}
