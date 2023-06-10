import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemsSearch } from '@/components/SongLists/SongItemsSearch'
import { Videos } from '@/components/SongLists/Videos'
import { ChannelType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import { useState } from 'react'
import useSWR from 'swr'

export type ChannelsShowProps = {
  id: number
}

export const ChannelsShow: React.FC<ChannelsShowProps> = ({ id }) => {
  const [songQuery, setSongQuery] = useState('')
  const [songSince, setSongSince] = useState('')
  const [songUntil, setSongUntil] = useState('')
  const [songVideoTitle, setSongVideoTitle] = useState('')

  const { data, error } = useSWR<{ channel: ChannelType }>(
    `/channels/${id}?`,
    getData
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="channel">
      <h1>{data.channel.name}</h1>
      <div className="d-flex">
        <div className="w-50 px-2">
          <div className="text-sm fw-bold w-100 text-center">歌一覧</div>
          <SongItemsSearch
            query={songQuery}
            setQuery={setSongQuery}
            since={songSince}
            setSince={setSongSince}
            until={songUntil}
            setUntil={setSongUntil}
            videoTitle={songVideoTitle}
            setVideoTitle={setSongVideoTitle}
          />
          <SongItems channelId={data.channel.id} query={songQuery} />
        </div>
        <div className="w-50 px-2">
          <div className="text-sm fw-bold w-100 text-center">配信から検索</div>
          <Videos channel={data.channel} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
