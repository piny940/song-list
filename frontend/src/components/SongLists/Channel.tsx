import { TestID } from '@/resources/TestID'
import { TWITTER_URL, YOUTUBE_URL } from '@/resources/constants'
import { ChannelType } from '@/resources/types'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { YoutubeIcon } from '../Common/YoutubeIcon'
import { TwitterIcon } from '../Common/TwitterIcon'

const ChannelDiv = styled.div`
  height: 90px;
`
const LinksDiv = styled.div`
  position: absolute;
  bottom: 5px;
  z-index: 3;
`

export type ChannelProps = {
  channel: ChannelType
  link: string
}

export const Channel: React.FC<ChannelProps> = ({ channel, link }) => {
  return (
    <ChannelDiv
      className="d-flex flex-grow-1 border border-light rounded m-1 p-2 shadow-sm position-relative"
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
      <div className="ms-3">
        <Link href={`${link}/${channel.id}`} className="stretched-link">
          <span className="fw-bold p-2 pt-3">{channel.name}</span>
        </Link>
        <LinksDiv>
          <Link
            href={`${YOUTUBE_URL}/${channel.custom_id}`}
            className="m-2"
            target="_blank"
          >
            <YoutubeIcon />
          </Link>
          {channel.twitter_id && (
            <Link
              href={`${TWITTER_URL}/${channel.twitter_id}`}
              className="m-2"
              target="_blank"
            >
              <TwitterIcon />
            </Link>
          )}
        </LinksDiv>
      </div>
    </ChannelDiv>
  )
}
