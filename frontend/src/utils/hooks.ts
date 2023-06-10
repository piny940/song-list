import { useRouter } from 'next/router'

export const usePaginate = (key: string, defaultPage = 1) => {
  const router = useRouter()
  const getPage = () => {
    return Number(router.query[key] || defaultPage)
  }
  const setPage = (newPage: number) => {
    if (!router.isReady) return
    router.query[key] = String(newPage)
    void router.push(router, undefined, { scroll: false })
  }

  return { getPage, setPage }
}
