import { Videos } from '@/components/SongLists/Videos'
import { Channel } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import useSWR from 'swr'

export type ChannelsShowProps = {
  id: number
}

export const ChannelsShow: React.FC<ChannelsShowProps> = ({ id }) => {
  const { data, error } = useSWR<{ channel: Channel }>(
    `/channels/${id}`,
    getData
  )

  if (error) return <Error statusCode={404} />

  return data ? (
    <div className="channel">
      <h1>{data.channel.name}</h1>
      <div className="w-50">
        <div className="text-sm fw-bold w-100 text-center">配信から検索</div>
        <Videos type="medium" channel={data.channel} />
      </div>
    </div>
  ) : (
    <div className="">loading...</div>
  )
}
