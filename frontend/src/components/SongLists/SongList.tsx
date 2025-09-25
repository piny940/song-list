import { VideoType } from '@/resources/types'
import { toSongLink } from '@/utils/helpers'
import Link from 'next/link'
import { styled } from 'styled-components'
import { Loading } from '../Common/Loading'
import Error from 'next/error'
import { useSongItems } from '@/hooks/songItem'
import { TestID } from '@/resources/TestID'

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
  const { data, error } = useSongItems({
    videoId: video.id,
    count: 1000, // すべての歌を1ページに表示する
  })

  if (error) return <Error statusCode={400} />
  return data
    ? (
        <ul className="song-items list-unstyled ps-4 mt-2">
          {data.song_items.length > 0
            ? (
                data.song_items.map(song => (
                  <OneLineLi
                    className="my-1 w-100"
                    key={song.id}
                    data-testid={TestID.SONG_LIST_ITEM}
                  >
                    <Link
                      className="unstyled w-100 d-inline-block"
                      href={toSongLink(song)}
                      target="_blank"
                      title="Youtubeで視聴"
                    >
                      <span className="ms-1 me-3">{song.time}</span>
                      <span className="me-3">{song.title}</span>
                      {song.author && (
                        <span className="me-3">
                          /
                          {song.author}
                        </span>
                      )}
                    </Link>
                  </OneLineLi>
                ))
              )
            : (
                <div className="text-center my-1">
                  この動画での歌情報は登録されていません。
                </div>
              )}
        </ul>
      )
    : (
        <Loading />
      )
}
