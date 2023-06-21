import { useRouter } from 'next/router'
import { queryToSearchParams } from '../utils/helpers'
import { useId, useState } from 'react'

export const usePaginate = (defaultPage = 1) => {
  const id = useId()
  const router = useRouter()
  const getPage = () => {
    return Number(router.query[id] || defaultPage)
  }
  const setPage = (newPage: number) => {
    router.query[id] = String(newPage)
    void router.push(
      `${router.pathname}?${queryToSearchParams(router.query).toString()}`,
      undefined,
      { scroll: false }
    )
  }

  return { getPage, setPage }
}

export const useHold = (timer: number) => {
  const [isReady, setIsReady] = useState(true)
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
