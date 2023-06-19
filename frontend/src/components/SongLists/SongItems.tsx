import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { SongItem } from './SongItem'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'
import { styled } from 'styled-components'
import { toVideoDate } from '@/utils/helpers'

const VideoTitleDiv = styled.div`
  height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

export type SongItemsProps = {
  songItems: SongItemType[] | undefined
  getPage: () => number
  setPage: (page: number) => void
  totalPages: number
  isLink: boolean
  onClick?: (songItem: SongItemType) => void
}

export const SongItems: React.FC<SongItemsProps> = ({
  songItems,
  getPage,
  setPage,
  totalPages,
  isLink,
  onClick,
}) => {
  const videos: { [videoId in string]: VideoType } = {}
  const songItemsDict: { [videoId in string]: SongItemType[] } = {}
  for (const song of songItems || []) {
    const videoId = song.video.video_id
    if (!Object.keys(videos).includes(videoId)) {
      videos[videoId] = song.video
      songItemsDict[videoId] = [song]
    } else {
      songItemsDict[videoId].push(song)
    }
  }

  return songItems ? (
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
                {songItemsDict[video.video_id].map((songItem) => (
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
            totalPages={totalPages}
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
