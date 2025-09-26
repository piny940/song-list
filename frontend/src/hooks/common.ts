import { useRouter } from 'next/router'
import { queryToSearchParams } from '../utils/helpers'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import useSWR, { KeyedMutator } from 'swr'
import { getData } from '@/utils/api'
import { BareFetcher, PublicConfiguration } from 'swr/_internal'

export const usePaginate = (defaultPage = 1) => {
  const id = useId()
  const router = useRouter()
  const getPage = useCallback(() => {
    return Number(router.query[id] || defaultPage)
  }, [defaultPage, id, router.query])
  const setPage = useCallback((newPage: number) => {
    router.query[id] = String(newPage)
    void router.push(
      `${router.pathname}?${queryToSearchParams(router.query).toString()}`,
      undefined,
      { scroll: false },
    )
  }, [id, router])

  return { getPage, setPage }
}

export const useHold = (timer: number) => {
  const [isReady, setIsReady] = useState(true)
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)

  const updateTimer = useRef(() => {
    if (timeoutId) clearTimeout(timeoutId)
    console.log(timeoutId)
    setIsReady(false)

    setTimeoutId(
      setTimeout(() => {
        setIsReady(true)
      }, timer),
    )
  })
  return { isReady, updateTimer: updateTimer.current }
}

const mutates: { [url in string]: { [id in string]: KeyedMutator<any> } } = {}
export function useSWRWithQuery<T = any>(
  url: string | undefined | null,
  query = '',
  config: Partial<PublicConfiguration<T, any, BareFetcher<T>>> | undefined,
) {
  const data = useSWR<T>(url && url + query, getData, config)
  const id = useId()
  useEffect(() => {
    if (url) {
      if (!mutates[url]) mutates[url] = {}
      mutates[url][id] = data.mutate
    }

    return () => {
      if (!url) return

      delete mutates[url][id]
    }
  }, [url, id, data.mutate])

  // クエリパラメータに関係なくURLが一致するものは全てmutateする
  const mutateAll = useCallback(async () => {
    if (!url) return
    return await Promise.all(
      Object.values(mutates[url]).map(async (mutate) => {
        return await mutate()
      }),
    )
  }, [url])
  return [data, mutateAll] as const
}

export const usePageChange = (handler: () => void) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handler)

    return () => {
      router.events.off('routeChangeComplete', handler)
    }
  })
}
