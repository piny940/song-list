import { TestID } from '@/resources/TestID'
import { Channel as ChannelType } from '@/resources/types'

export type ChannelProps = {
  channel: ChannelType
}

export const Channel: React.FC<ChannelProps> = ({ channel }) => {
  return (
    <div className="" data-testid={TestID.CHANNEL}>
      {channel.name}
    </div>
  )
}
