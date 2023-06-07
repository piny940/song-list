export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const timeToString = (time: Date) => {
  const hh = ('0' + time.getHours().toString()).slice(-2)
  const mm = ('0' + time.getMinutes().toString()).slice(-2)
  const ss = ('0' + time.getSeconds().toString()).slice(-2)
  return `${hh}:${mm}:${ss}`
}
