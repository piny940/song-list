import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemsSearch } from '@/components/SongLists/SongItemsSearch'
import { Videos } from '@/components/SongLists/Videos'
import { VideosSearch } from '@/components/SongLists/VideosSearch'
import { useSongItems } from '@/hooks/songItem'
import { useVideos } from '@/hooks/video'
import { ChannelType, VideoType } from '@/resources/types'
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

  const [videoQuery, setVideoQuery] = useState('')
  const [videoSince, setVideoSince] = useState('')
  const [videoUntil, setVideoUntil] = useState('')

  const { data, error: channelError } = useSWR<{ channel: ChannelType }>(
    `/channels/${id}?`,
    getData
  )

  // 歌一覧データ
  const {
    data: songItemData,
    error: songItemError,
    setPage: setSongItemPage,
    getPage: getSongItemPage,
  } = useSongItems({
    channelId: data?.channel?.id,
    query: songQuery,
    since: songSince,
    until: songUntil,
    videoTitle: songVideoTitle,
  })

  // 動画一覧データ
  const {
    data: videoData,
    error: videoError,
    setPage,
    getPage,
  } = useVideos({
    query: videoQuery,
    since: videoSince,
    until: videoUntil,
    channel: data?.channel,
  })

  // 歌を確認中の動画
  const [openVideo, setOpenVideo] = useState<VideoType | null>(null)

  // 選択中の動画の歌一覧
  const { data: videoSongsData, error: videoSongsError } = useSongItems({
    videoId: openVideo?.id,
    isPaused: !openVideo,
    count: 1000,
  })

  if (channelError || videoError || songItemError || videoSongsError)
    return <Error statusCode={404} />

  return data ? (
    <div className="channel">
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
            songItems={songItemData?.song_items}
            totalPages={songItemData?.total_pages || 0}
            setPage={setSongItemPage}
            getPage={getSongItemPage}
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
          />
          <Videos
            videos={videoData?.videos}
            totalPages={videoData?.total_pages || 0}
            setPage={setPage}
            getPage={getPage}
            openedVideo={openVideo}
            setOpenedVideo={setOpenVideo}
            songItems={videoSongsData?.song_items}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
