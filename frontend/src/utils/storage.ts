const KEY = '6BSFztkuV6wfRY8'

export const toStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY + key, value)
}

export const fromStorage = (key: string) => {
  if (typeof window === 'undefined') return
  return localStorage.getItem(KEY + key)
}
