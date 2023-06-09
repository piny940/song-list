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
  created_at: string
  updated_at: string
}

export type VideoType = {
  id: number
  video_id: string
  title: string
  kind: string
  channel_id: string
  thumbnails: Thumbnails
  description: string
  published_at: string
  created_at: string
  updated_at: string
}

export type SongItemType = {
  id: number
  video: VideoType
  time: string
  title: string
  author: string
  created_at: string
  updated_at: string
}
