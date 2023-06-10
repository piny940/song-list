import { useRouter } from 'next/router'
import { queryToSearchParams } from './helpers'
import { useState } from 'react'

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

export const useHold = (timer: number) => {
  const [isReady, setIsReady] = useState(false)
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)

  const updateTimer = () => {
    console.log(timeoutId)
    if (timeoutId) clearTimeout(timeoutId)
    setIsReady(false)

    setTimeoutId(
      setTimeout(() => {
        setIsReady(true)
      }, timer)
    )
  }
  return { isReady, updateTimer }
}
