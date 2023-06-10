import { ParsedUrlQuery } from 'querystring'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const timeToString = (time: Date) => {
  const hh = ('0' + time.getHours().toString()).slice(-2)
  const mm = ('0' + time.getMinutes().toString()).slice(-2)
  const ss = ('0' + time.getSeconds().toString()).slice(-2)
  return `${hh}:${mm}:${ss}`
}
export const queryToSearchParams = (
  query: Record<string, string> | ParsedUrlQuery
) => {
  return new URLSearchParams(query as Record<string, string>)
}
