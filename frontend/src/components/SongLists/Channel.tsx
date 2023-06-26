import { TestID } from '@/resources/TestID'
import { YOUTUBE_URL } from '@/resources/constants'
import { ChannelType } from '@/resources/types'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const ChannelDiv = styled.div`
  height: 90px;
`
const YoutubeIcon = styled.span`
  width: 22px;
  height: 22px;
  background-image: url('/images/youtube.svg');
  background-size: contain;
  display: inline-block;

  &:hover {
    background-image: url('/images/youtube-red.svg');
  }
`

export type ChannelProps = {
  channel: ChannelType
  link: string
}

export const Channel: React.FC<ChannelProps> = ({ channel, link }) => {
  return (
    <ChannelDiv
      className="d-flex flex-grow-1 border border-light rounded m-1 p-2 shadow-sm"
      data-testid={TestID.CHANNEL}
    >
      <div className="d-flex align-items-center">
        <Image
          alt="channel icon"
          src={channel.thumbnails.default.url}
          width={80}
          height={80}
          className="rounded-circle"
        />
      </div>
      <div className="d-flex flex-column ms-3 justify-content-between">
        <Link href={`${link}/${channel.id}`}>
          <span className="fw-bold mt-2 ms-2">{channel.name}</span>
        </Link>
        <div className="ms-2">
          <Link href={`${YOUTUBE_URL}/${channel.custom_id}`}>
            <YoutubeIcon role="button" />
          </Link>
        </div>
      </div>
    </ChannelDiv>
  )
}
