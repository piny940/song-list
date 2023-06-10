import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const usePaginate = (key: string, defaultPage = 1) => {
  const router = useRouter()
  const getPage = () => {
    return Number(router.query[key])
  }
  const setPage = (newPage: number) => {
    router.query[key] = String(newPage)
    void router.push(router, undefined, { scroll: false })
  }

  useEffect(() => {
    setPage(defaultPage)
  }, [])

  return { getPage, setPage }
}
