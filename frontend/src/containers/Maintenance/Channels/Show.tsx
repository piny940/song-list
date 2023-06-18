import { Loading } from '@/components/Common/Loading'
import { SongItems } from '@/components/SongLists/SongItems'
import { ChannelType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'

export type MaintenanceChannelsShowProps = {
  id: number
}

export const MaintenanceChannelsShow: React.FC<
  MaintenanceChannelsShowProps
> = ({ id }) => {
  const { data, error } = useSWR<{ channel: ChannelType }>(
    `/channels/${id}`,
    getData
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="">
      <h1 className="sub">{data.channel.name}</h1>
      <div className="row">
        <SongItems isLink={false} channelId={id} />
      </div>
    </div>
  ) : (
    <Loading />
  )
}
