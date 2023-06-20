import { Channels } from '@/components/SongLists/Channels'
import { useChannels } from '@/hooks/channel'
import { UserType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const MaintenanceHome: React.FC = () => {
  const { data, error } = useSWR<{ user: UserType }>('/user', getData)
  const { data: channelsData, error: channelsError } = useChannels({
    isPaused: !data?.user,
  })
  const router = useRouter()

  if (error || channelsError) return <Error statusCode={400} />
  if (data && !data.user) void router.push('/session/new')
  return (
    <div className="">
      <h1 className="sub">チャンネル一覧</h1>
      <div className="">
        <Channels
          channels={channelsData?.channels}
          link="/maintenance/channels"
        />
      </div>
    </div>
  )
}
