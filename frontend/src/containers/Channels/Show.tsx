import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
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
          <div className="song-search">
            <div className="row px-4 mt-2 mb-4">
              <div className="fw-bold col-2 col-form-label">検索</div>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  value={songQuery}
                  placeholder="曲名/歌手名を入力"
                  onChange={(e) => {
                    setSongQuery(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="detail-search my-2 px-4">
              <a role="button" className="">
                <span>&#9654;</span>
                <span className="ms-1">詳細検索</span>
              </a>
              <div className="m-2" id="song-detail-search">
                <label className="row my-1">
                  <div className="col-3 fw-bold col-form-label">開始日</div>
                  <div className="col-9">
                    <input type="date" name="since" className="form-control" />
                  </div>
                </label>
                <label className="row my-1">
                  <div className="col-3 fw-bold col-form-label">終了日</div>
                  <div className="col-9">
                    <input type="date" name="until" className="form-control" />
                  </div>
                </label>
                <label className="row my-1">
                  <div className="col-3 fw-bold col-form-label">枠名</div>
                  <div className="col-9">
                    <input
                      type="text"
                      name="videoTitle"
                      className="form-control"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
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
