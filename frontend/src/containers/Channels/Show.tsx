import { Head } from '@/components/Common/Head'
import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemsSearch } from '@/components/SongLists/SongItemsSearch'
import { Videos } from '@/components/SongLists/Videos'
import { VideosSearch } from '@/components/SongLists/VideosSearch'
import { useChannel } from '@/hooks/channel'
import { isMobile } from '@/utils/helpers'
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

  return (
    <div className="channel">
      {data ? (
        <>
          <Head
            title={data.channel.custom_name + ' - 歌枠データベース'}
            keywords={[data.channel.custom_name]}
          />
          <h1>{data.channel.name}</h1>
        </>
      ) : (
        <Loading />
      )}
      <div className="row py-4 m-0">
        <section className="col-lg-6 px-2">
          <h2 className="h6 m-0 fw-bold w-100 text-center">歌一覧</h2>
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
            channelId={id}
            query={songQuery}
            since={songSince}
            until={songUntil}
            videoTitle={songVideoTitle}
          />
        </section>
        {!isMobile() && (
          <section className="col-lg-6 px-3 d-none d-lg-block">
            <div className="h6 mb-4 w-100 text-center">配信から検索</div>
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
              channelId={id}
              query={videoQuery}
              since={videoSince}
              until={videoUntil}
              onlySongLives={onlySongLives}
            />
          </section>
        )}
      </div>
    </div>
  )
}
