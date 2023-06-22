import { Channels } from '@/components/SongLists/Channels'
import { useUser } from '@/hooks/user'
import Error from 'next/error'
import { useRouter } from 'next/router'

export const MaintenanceHome: React.FC = () => {
  const { data, error } = useUser()
  const router = useRouter()

  if (error) return <Error statusCode={400} />
  if (data && !data.user) void router.push('/session/new')
  return (
    <div className="maintenance-home">
      <h1 className="sub">チャンネル一覧</h1>
      <div className="">
        <Channels link="/maintenance/channels" />
      </div>
    </div>
  )
}
