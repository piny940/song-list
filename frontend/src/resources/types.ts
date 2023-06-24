import { AlertState } from './enums'

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

export type UserType = {
  id: number
  name: string
  created_at: string
  updated_at: string
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

export type SongDiffType = {
  id: number
  song_item_id: number
  time: string
  title: string
  author: string
  status: string
  kind: string
  created_at: string
  updated_at: string
  made_by: UserType
}

export type Alert = {
  id: number
  content: string
  state: AlertState
}

export type AlertInput = {
  content: string
  state: AlertState
}
