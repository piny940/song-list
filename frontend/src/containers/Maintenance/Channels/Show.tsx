import { Loading } from '@/components/Common/Loading'
import { NewSongDiff } from '@/components/SongLists/NewSongDiff'
import { SongItems } from '@/components/SongLists/SongItems'
import { SongItemType } from '@/resources/types'
import Error from 'next/error'
import { useState } from 'react'
import styles from '@/styles/song-lists.module.scss'
import { useChannel } from '@/hooks/channel'
import { SongDiffs } from '@/components/SongLists/SongDiffs'
import { SongItemsSearch } from '@/components/SongLists/SongItemsSearch'

export type MaintenanceChannelsShowProps = {
  id: number
}

export const MaintenanceChannelsShow: React.FC<
  MaintenanceChannelsShowProps
> = ({ id }) => {
  const [query, setQuery] = useState('')
  const [since, setSince] = useState<Date | null>(null)
  const [until, setUntil] = useState<Date | null>(null)
  const [videoTitle, setVideoTitle] = useState('')
  const { data, error } = useChannel(id)
  const [currentSongItem, setCurrentSongItem] = useState<SongItemType | null>(
    null
  )
  const onSongItemClick = (songItem: SongItemType) => {
    window.scroll(0, 0)
    setCurrentSongItem(songItem)
  }

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
          <SongItemsSearch
            query={query}
            setQuery={setQuery}
            since={since}
            setSince={setSince}
            until={until}
            setUntil={setUntil}
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
          />
          <SongItems
            channelId={id}
            onClick={onSongItemClick}
            query={query}
            since={since}
            until={until}
            videoTitle={videoTitle}
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
