import { Head } from '@/components/Common/Head'
import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemsSearch } from '@/components/SongLists/SongItemsSearch'
import { Videos } from '@/components/SongLists/Videos'
import { VideosSearch } from '@/components/SongLists/VideosSearch'
import { useChannel } from '@/hooks/channel'
import Error from 'next/error'
import { useState } from 'react'

export type ChannelsShowProps = {
  id: number
}

export const ChannelsShow: React.FC<ChannelsShowProps> = ({ id }) => {
  const [songQuery, setSongQuery] = useState('')
  const [songSince, setSongSince] = useState<Date | null>(null)
  const [songUntil, setSongUntil] = useState<Date | null>(null)
  const [songVideoTitle, setSongVideoTitle] = useState('')

  const [videoQuery, setVideoQuery] = useState('')
  const [videoSince, setVideoSince] = useState<Date | null>(null)
  const [videoUntil, setVideoUntil] = useState<Date | null>(null)
  const [onlySongLives, setOnlySongLives] = useState(true)

  const { data, error } = useChannel(id)

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="channel">
      <Head
        title={data.channel.custom_name + ' - 歌枠データベース'}
        keywords={[data.channel.custom_name]}
      />
      <h1>{data.channel.name}</h1>
      <div className="row p-0 m-0">
        <div className="col-lg-6 px-2">
          <div className="text-sm fw-bold w-100 text-center d-none d-lg-block">
            歌一覧
          </div>
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
          <SongItems
            channelId={data.channel.id}
            query={songQuery}
            since={songSince}
            until={songUntil}
            videoTitle={songVideoTitle}
            isLink={true}
          />
        </div>
        <div className="col-lg-6 px-2 d-none d-lg-block">
          <div className="text-sm fw-bold w-100 text-center">配信から検索</div>
          <VideosSearch
            query={videoQuery}
            setQuery={setVideoQuery}
            since={videoSince}
            setSince={setVideoSince}
            until={videoUntil}
            setUntil={setVideoUntil}
            onlySongLives={onlySongLives}
            setOnlySongLives={setOnlySongLives}
          />
          <Videos
            channel={data.channel}
            query={videoQuery}
            since={videoSince}
            until={videoUntil}
            onlySongLives={onlySongLives}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
