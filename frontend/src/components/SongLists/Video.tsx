import { TestID } from '@/resources/TestID'
import { SongItemType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import { timeToString } from '@/utils/helpers'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { styled } from 'styled-components'
import useSWR from 'swr'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
`

export type VideoProps = {
  video: VideoType
  songListOpen: boolean
  toggleSongListOpened: () => void
}

export const Video: React.FC<VideoProps> = ({
  video,
  songListOpen,
  toggleSongListOpened,
}) => {
  const { data, error } = useSWR<{ song_items: SongItemType[] }>(
    `/song_items?video_id=${video.id}`,
    getData
  )

  const toVideoTime = (publishedAt: string) => {
    const time = new Date(publishedAt)
    if (!time) return ''
    return `${time.getFullYear()}/${time.getMonth()}/${time.getDate()}`
  }
  const toSongLink = (songItem: SongItemType) => {
    const time = new Date(songItem.time)
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()

    return `https://www.youtube.com/watch?v=${video.video_id}&t=${
      hour * 3600 + minute * 60 + second
    }`
  }

  if (error) return <Error statusCode={400} />
  return (
    <div
      className="video  border border-light shadow-sm m-1"
      data-testid={TestID.VIDEO}
    >
      <a
        className="d-flex text-body"
        onClick={toggleSongListOpened}
        role="button"
      >
        <Image
          src={video.thumbnails.medium.url}
          width={160}
          height={90}
          alt=""
        />
        <div className="d-flex flex-column justify-content-between">
          <OneLineDiv className="p-2">
            <span>{video.title}</span>
          </OneLineDiv>
          <div className="pe-2 text-muted d-flex flex-row-reverse">
            <span>{toVideoTime(video.published_at)}</span>
          </div>
        </div>
      </a>
      {data && songListOpen && (
        <div className="song-items ps-4 mt-2">
          {data && data.song_items.length > 0 ? (
            <ul>
              {data.song_items.map((song) => (
                <li key={song.id}>
                  <OneLineDiv className="my-1">
                    <Link
                      href={toSongLink(song)}
                      target="_blank"
                      title="Youtubeで視聴"
                    >
                      <span className="ms-1 me-3">
                        {timeToString(new Date(song.time))}
                      </span>
                      <span className="me-3">{song.title}</span>
                      {song.author && (
                        <span className="me-3">/ {song.author}</span>
                      )}
                    </Link>
                  </OneLineDiv>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center my-1">
              この動画での歌情報は登録されていません。
            </div>
          )}
        </div>
      )}
    </div>
  )
}
