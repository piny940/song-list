import { SongItemType } from '@/resources/types'
import { timeToString, toSongLink } from '@/utils/helpers'
import Link from 'next/link'
import { styled } from 'styled-components'

const OneLineDiv = styled.div`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  height: 30px;
`

export type SongListProps = {
  songItems: SongItemType[]
}

export const SongList: React.FC<SongListProps> = ({ songItems }) => {
  return (
    <ul>
      {songItems.map((song) => (
        <li key={song.id}>
          <OneLineDiv className="my-1">
            <Link href={toSongLink(song)} target="_blank" title="Youtubeで視聴">
              <span className="ms-1 me-3">
                {timeToString(new Date(song.time))}
              </span>
              <span className="me-3">{song.title}</span>
              {song.author && <span className="me-3">/ {song.author}</span>}
            </Link>
          </OneLineDiv>
        </li>
      ))}
    </ul>
  )
}
