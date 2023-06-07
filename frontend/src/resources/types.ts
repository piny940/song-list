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

export type ChannelType = {
  id: number
  channel_id: string
  name: string
  twitter_id: string | null
  thumbnails: Thumbnails
  description: string
}

export type Video = {
  id: number
  video_id: string
  title: string
  kind: string
  channel_id: string
  thumbnails: Thumbnails
  description: string
}

export type SongItem = {
  id: number
  video_id: string
  time: Date
  title: string
  author: string
}
