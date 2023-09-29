import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import Error from 'next/error'
import { SongItem } from './SongItem'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { styled } from 'styled-components'
import { toVideoDate, toVideoLink } from '@/utils/helpers'
import { useSongItems } from '@/hooks/songItem'
import Link from 'next/link'

const VideoTitleH3 = styled.h3`
  height: 19px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 0;
  padding: 0;
`

export type SongItemsProps = {
  channelId?: number
  videoId?: number
  query?: string
  since?: Date | null
  until?: Date | null
  videoTitle?: string
  isLink: boolean
  onClick?: (songItem: SongItemType) => void
}

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
  const { data, error, getPage, setPage } = useSongItems({
    query,
    channelId,
    videoId,
    since,
    until,
    videoTitle,
    holdTime: 300,
  })

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
    <div className="pb-4" data-testid={TestID.SONG_ITEMS}>
      {Object.keys(videos).length > 0 ? (
        <>
          {Object.values(videos).map((video) => (
            <div className="" key={video.video_id}>
              <Link href={toVideoLink(video)} target="_blank">
                <VideoTitleH3 className="w-75 small text-muted">
                  <span>{toVideoDate(video.published_at)}</span>
                  <span className="">{video.title}</span>
                </VideoTitleH3>
              </Link>
              <div className="mb-4 ps-3">
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
