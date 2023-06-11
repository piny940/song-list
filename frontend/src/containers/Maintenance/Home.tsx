import { Channels } from '@/components/SongLists/Channels'
import { getData } from '@/utils/api'
import Error from 'next/error'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const MaintenanceHome: React.FC = () => {
  const { data, isLoading, error } = useSWR('/user', getData)
  const router = useRouter()

  if (error) return <Error statusCode={400} />
  if (!isLoading && !data) void router.push('/session/new')
  return (
    <div className="">
      <h1 className="sub">チャンネル一覧</h1>
      <div className="">
        <Channels link="/maintenance/channels" />
      </div>
    </div>
  )
}
