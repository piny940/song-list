import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'
import { SongItem } from './SongItem'
import { Loading } from '../Common/Loading'
import { useEffect } from 'react'
import { Paging } from '../Common/Paging'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'

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
}

const DEFAULT_PAGE = 1
export const SongItems: React.FC<SongItemsProps> = ({
  channelId,
  videoId,
  query,
}) => {
  const router = useRouter()
  const { data, error } = useSWR<{
    song_items: SongItemType[]
    total_pages: number
  }>(
    '/song_items?' +
      new URLSearchParams({
        query: query || '',
        channel_id: channelId != null ? String(channelId) : '',
        video_id: videoId != null ? String(videoId) : '',
        count: '15',
        page: String(router.query['song-items-page']),
      }).toString(),
    getData
  )
  const setPage = (newPage: number) => {
    router.query['song-items-page'] = String(newPage)
    void router.push(router, undefined, { scroll: false })
  }
  useEffect(() => {
    setPage(DEFAULT_PAGE)
  }, [query])

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

  return data ? (
    <div className="">
      {Object.values(videos).map((video) => (
        <div className="" key={video.video_id}>
          <VideoTitleDiv className="w-75">
            <span className="small text-muted">{video.title}</span>
          </VideoTitleDiv>
          <div className="mb-4 ps-3" data-testid={TestID.SONG_ITEMS}>
            {songItems[video.video_id].map((songItem) => (
              <div key={songItem.id}>
                <SongItem songItem={songItem} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <Paging
        currentPage={Number(router.query['song-items-page'])}
        totalPages={data.total_pages}
        setPageNumber={setPage}
      />
    </div>
  ) : (
    <Loading />
  )
}
