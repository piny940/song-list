import { TestID } from '@/resources/TestID'
import { Channel as ChannelType } from '@/resources/types'
import Image from 'next/image'
import styled from 'styled-components'

const ChannelDiv = styled.div`
  width: 400px;
  height: 100px;
`

export type ChannelProps = {
  channel: ChannelType
}

export const Channel: React.FC<ChannelProps> = ({ channel }) => {
  return (
    <ChannelDiv
      className="d-flex border border-light rounded m-3 p-2 shadow-sm"
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
      <div className="d-flex flex-column ms-3">
        <span className="fw-bold mt-2 ms-2">{channel.name}</span>
      </div>
    </ChannelDiv>
  )
}
