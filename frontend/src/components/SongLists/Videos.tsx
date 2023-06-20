import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { Video } from './Video'
import { Loading } from '../Common/Loading'
import { Paging } from '../Common/Paging'

export type VideosProps = {
  videos: VideoType[] | undefined
  totalPages: number
  setPage: (page: number) => void
  getPage: () => number
  openedVideo: VideoType | null
  setOpenedVideo: (video: VideoType | null) => void
  songItems: SongItemType[] | undefined
}

export const Videos: React.FC<VideosProps> = ({
  videos,
  totalPages,
  setPage,
  getPage,
  openedVideo,
  setOpenedVideo,
  songItems,
}) => {
  return videos ? (
    <div className="videos pb-4" data-testid={TestID.VIDEOS}>
      {videos.length > 0 ? (
        <>
          <div className="mb-4">
            {videos.map((video) => (
              <Video
                songItems={songItems}
                songListOpen={openedVideo?.id === video.id}
                video={video}
                key={video.id}
                toggleSongListOpened={() => {
                  if (openedVideo === video) setOpenedVideo(null)
                  else setOpenedVideo(video)
                }}
              />
            ))}
          </div>
          <Paging
            setPageNumber={setPage}
            totalPages={totalPages}
            currentPage={getPage()}
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
