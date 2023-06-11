import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { SongItem } from './SongItem'
import { Loading } from '../Common/Loading'
import { useEffect, useRef } from 'react'
import { Paging } from '../Common/Paging'
import { styled } from 'styled-components'
import { useHold, usePaginate } from '@/utils/hooks'
import { queryToSearchParams, toVideoDate } from '@/utils/helpers'

const VideoTitleDiv = styled.div`
  height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

export type SongItemsProps = {
  channelId?: number
  videoId?: number
  query?: string
  since?: string
  until?: string
  videoTitle?: string
  isLink: boolean
  onClick?: (songItem: SongItemType) => void
}

const DEFAULT_PAGE = 1
export const SongItems: React.FC<SongItemsProps> = ({
  channelId,
  videoId,
  query,
  since,
  until,
  videoTitle,
  isLink,
  onClick,
}) => {
  const { getPage, setPage } = usePaginate('song-items-page', DEFAULT_PAGE)
  const { isReady, updateTimer } = useHold(500)
  const isFirst = useRef(true)
  const { data, error } = useSWR<{
    song_items: SongItemType[]
    total_pages: number
  }>(
    '/song_items?' +
      queryToSearchParams({
        query: query || '',
        since: since || '',
        until: until || '',
        video_title: videoTitle || '',
        channel_id: channelId != null ? String(channelId) : '',
        video_id: videoId != null ? String(videoId) : '',
        count: '15',
        page: String(getPage()),
      }).toString(),
    getData
  )

  useEffect(() => {
    if (isFirst) {
      isFirst.current = false
      return
    }
    setPage(DEFAULT_PAGE)
    updateTimer()
  }, [query, since, until, videoTitle])

  if (error) return <Error statusCode={404} />

  const videos: { [videoId in string]: VideoType } = {}
  const songItems: { [videoId in string]: SongItemType[] } = {}
  for (const song of data?.song_items || []) {
    const videoId = song.video.video_id
    if (!Object.keys(videos).includes(videoId)) {
      videos[videoId] = song.video
      songItems[videoId] = [song]
    } else {
      songItems[videoId].push(song)
    }
  }

  return isReady && data ? (
    <div className="pb-4">
      {Object.keys(videos).length > 0 ? (
        <>
          {Object.values(videos).map((video) => (
            <div className="" key={video.video_id}>
              <VideoTitleDiv className="w-75 small text-muted">
                <span>{toVideoDate(video.published_at)}</span>
                <span className="">{video.title}</span>
              </VideoTitleDiv>
              <div className="mb-4 ps-3" data-testid={TestID.SONG_ITEMS}>
                {songItems[video.video_id].map((songItem) => (
                  <div key={songItem.id}>
                    <SongItem
                      isLink={isLink}
                      songItem={songItem}
                      onClick={onClick && (() => onClick(songItem))}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Paging
            currentPage={getPage()}
            totalPages={data.total_pages}
            setPageNumber={setPage}
          />
        </>
      ) : (
        <div className="mb-4 text-center">
          条件に合致する歌は見つかりませんでした。
        </div>
      )}
    </div>
  ) : (
    <Loading />
  )
}
