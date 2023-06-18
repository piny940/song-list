import { Loading } from '@/components/Common/Loading'
import { NewSongDiff } from '@/components/SongLists/NewSongDiff'
import { SongItems } from '@/components/SongLists/SongItems'
import { ChannelType, SongItemType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import { useState } from 'react'
import useSWR from 'swr'

export type MaintenanceChannelsShowProps = {
  id: number
}

export const MaintenanceChannelsShow: React.FC<
  MaintenanceChannelsShowProps
> = ({ id }) => {
  const { data, error } = useSWR<{ channel: ChannelType }>(
    `/channels/${id}`,
    getData
  )
  const [currentSongItem, setCurrentSongItem] = useState<SongItemType | null>(
    null
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="">
      <h1 className="sub">{data.channel.name}</h1>
      <div className="d-flex p-0 m-0">
        <div className="w-100 flex-shrink-1 px-2">
          <div className="text-sm fw-bold w-100 text-center d-none d-lg-block">
            歌一覧
          </div>
          <SongItems
            isLink={false}
            channelId={id}
            onClick={(songItem) => setCurrentSongItem(songItem)}
          />
        </div>
        {currentSongItem && (
          <div className="col-lg-6 flex-shrink-0 px-2 d-none d-lg-block">
            <div className="text-sm fw-bold w-100 text-center">修正</div>
            <NewSongDiff songItem={currentSongItem} />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  )
}
