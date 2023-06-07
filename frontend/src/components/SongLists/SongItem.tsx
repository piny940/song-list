import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { timeToString } from '@/utils/helpers'
import { styled } from 'styled-components'

const SongItemDiv = styled.div`
  height: 50px;
`

export type SongItemProps = {
  songItem: SongItemType
}

export const SongItem: React.FC<SongItemProps> = ({ songItem }) => {
  const time = new Date(songItem.time)
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return (
    <SongItemDiv
      className="border border-light shadow-sm m-1 p-2"
      data-testid={TestID.SONG_ITEM}
    >
      <a
        href={`https://www.youtube.com/watch?v=${songItem.video_id}&t=${
          hour * 3600 + minute * 60 + second
        }`}
        target="_blank"
      >
        {timeToString(time)}
      </a>
      {songItem.title}
    </SongItemDiv>
  )
}
