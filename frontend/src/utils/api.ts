import { serialize } from 'object-to-formdata'

const getToken = async (): Promise<string> => {
  const url = `/api/csrf`
  const response = await fetch(url, {
    credentials: 'include',
  })
  const json = await response.json()

  return json.data.token
}

export const fetchApi = async (params: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
}) => {
  const response = await fetch(`/api${params.url}`, {
    method: params.method,
    headers: {
      'X-CSRF-Token': params.method === 'GET' ? '' : await getToken(),
    },
    body: params.method === 'GET' ? null : serialize(params.data),
    credentials: 'include',
  })
  return response
}

export const getData = async (url: string) => {
  const response = await fetchApi({
    url: url,
    method: 'GET',
  })
  return await response.json()
}
