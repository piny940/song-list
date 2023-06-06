export type Theme = 'dark' | 'light'

export type Thumbnails = {
  default: {
    url: string
    width: number
    height: number
  }
  medium: {
    url: string
    width: number
    height: number
  }
  high: {
    url: string
    width: number
    height: number
  }
}

export type Channel = {
  id: number
  channel_id: string
  name: string
  twitter_id: string | null
  thumbnails: Thumbnails
  description: string
}
