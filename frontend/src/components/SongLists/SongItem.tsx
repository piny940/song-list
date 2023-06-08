import { TestID } from '@/resources/TestID'
import { SongItemType } from '@/resources/types'
import { timeToString } from '@/utils/helpers'
import Image from 'next/image'
import { styled } from 'styled-components'

const SongItemDiv = styled.div`
  /* height: 70px; */
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
    <a
      href={`https://www.youtube.com/watch?v=${songItem.video.video_id}&t=${
        hour * 3600 + minute * 60 + second
      }`}
      target="_blank"
    >
      <SongItemDiv
        className="d-flex align-items-center border border-light rounded shadow-sm m-1 p-3"
        data-testid={TestID.SONG_ITEM}
      >
        <div className="">
          <span className="">
            <div className="d-flex align-items-center">
              <Image
                src="/images/youtube.svg"
                width={22}
                height={22}
                alt="youtube icon"
              />
              <span className="ms-2">{timeToString(time)}</span>
            </div>
          </span>
        </div>
        <div className="d-flex flex-wrap">
          <div className="">
            <span className="ms-2">{songItem.title}</span>
          </div>
          {songItem.author && <span className="ms-3">/ {songItem.author}</span>}
        </div>
      </SongItemDiv>
    </a>
  )
}
