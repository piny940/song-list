import { SongItemType, VideoType } from '@/resources/types'
import { getData } from '@/utils/api'
import { toSongLink } from '@/utils/helpers'
import Link from 'next/link'
import { styled } from 'styled-components'
import useSWR from 'swr'
import { Loading } from '../Common/Loading'
import Error from 'next/error'

const OneLineLi = styled.li`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
`

export type SongListProps = {
  video: VideoType
}

export const SongList: React.FC<SongListProps> = ({ video }) => {
  const { data, error } = useSWR<{ song_items: SongItemType[] }>(
    `/song_items?video_id=${video.id}`,
    getData
  )

  if (error) return <Error statusCode={400} />
  return data ? (
    <div className="song-items ps-4 mt-2">
      {data.song_items.length > 0 ? (
        data.song_items.map((song) => (
          <OneLineLi className="my-1 w-100" key={song.id}>
            <Link
              className="w-100 d-inline-block"
              href={toSongLink(song)}
              target="_blank"
              title="Youtubeで視聴"
            >
              <span className="ms-1 me-3">{song.time}</span>
              <span className="me-3">{song.title}</span>
              {song.author && <span className="me-3">/ {song.author}</span>}
            </Link>
          </OneLineLi>
        ))
      ) : (
        <div className="text-center my-1">
          この動画での歌情報は登録されていません。
        </div>
      )}
    </div>
  ) : (
    <Loading />
  )
}
