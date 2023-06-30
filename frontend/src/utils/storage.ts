const KEY = '6BSFztkuV6wfRY8'

export const toStorage = (key: string, value: string) => {
  console.log('hoge')
  if (typeof window === 'undefined') return
  console.log(value)
  localStorage.setItem(KEY + key, value)
}

export const fromStorage = (key: string) => {
  if (typeof window === 'undefined') return
  console.log(localStorage.getItem(KEY + key))
  return localStorage.getItem(KEY + key)
}
