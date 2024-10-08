import { Loading } from '@/components/Common/Loading'
import { ChannelsShow } from '@/containers/Channels/Show'
import Error from 'next/error'
import { useRouter } from 'next/router'

const Show: React.FC = () => {
  const router = useRouter()
  const id = router.query.id

  if (!router.isReady) {
    return <Loading />
  }
  if (typeof id === 'object' || !id || isNaN(parseInt(id))) {
    return <Error statusCode={404} />
  }

  return <ChannelsShow id={parseInt(id)} />
}

export default Show
