import { Channel } from '@/resources/types'
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

export const postData = async (params: {
  url: string
  data: object
  scope?: string
  onSuccess: (json: any) => void
  onFail: (json: any) => void
}) => {
  const response = await fetchApi({
    url: params.url,
    method: 'POST',
    data: params.scope ? { [params.scope]: params.data } : params.data,
  })

  return await response.json()
}

export const updateData = async (params: {
  url: string
  data: object
  scope?: string
}) => {
  const response = await fetchApi({
    url: params.url,
    method: 'PATCH',
    data: params.scope ? { [params.scope]: params.data } : params.data,
  })
  return await response.json()
}

export const getChannels = async () => {
  const response = await fetchApi({
    url: '/channels',
    method: 'GET',
  })
  const json = await response.json()
  return json.channels as Channel[]
}
