import { Loading } from '@/components/Common/Loading'
import { NewSongDiff } from '@/components/SongLists/NewSongDiff'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemType } from '@/resources/types'
import Error from 'next/error'
import { useState } from 'react'
import styles from '@/styles/song-lists.module.scss'
import { useChannel } from '@/hooks/channel'
import { SongDiffs } from '@/components/SongLists/SongDiffs'

export type MaintenanceChannelsShowProps = {
  id: number
}

export const MaintenanceChannelsShow: React.FC<
  MaintenanceChannelsShowProps
> = ({ id }) => {
  const { data, error } = useChannel(id)
  const [currentSongItem, setCurrentSongItem] = useState<SongItemType | null>(
    null
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="">
      <h1 className="sub">{data.channel.name}</h1>
      <div className="d-flex p-0 m-0">
        <div
          className={
            `w-100 flex-shrink-1 ps-2 ${styles.shrinkLeft} ` +
            (currentSongItem ? styles.active : '')
          }
        >
          <div className="text-sm fw-bold w-100 text-center d-none d-lg-block">
            歌一覧
          </div>
          <SongItems
            isLink={false}
            channelId={id}
            onClick={(songItem) => setCurrentSongItem(songItem)}
          />
        </div>
        <div
          className={
            styles.collapsableRight +
            (currentSongItem ? ` ${styles.active} col-lg-6 flex-shrink-0` : '')
          }
        >
          {currentSongItem && (
            <>
              <div>
                <div className="text-sm fw-bold w-100 text-center">修正</div>
                <NewSongDiff songItem={currentSongItem} />
              </div>
              <div className="mt-5">
                <div className="text-sm fw-bold w-100 text-center mb-2">
                  修正履歴
                </div>
                <SongDiffs songItem={currentSongItem} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
