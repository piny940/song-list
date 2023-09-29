import { NoIndex } from '@/components/Common/NoIndex'
import { MaintenanceChannelsShow } from '@/containers/Maintenance/Channels/Show'
import Error from 'next/error'
import { useRouter } from 'next/router'

const Show: React.FC = () => {
  const router = useRouter()

  const id = router.query.id

  if (typeof id === 'object' || !id || isNaN(parseInt(id))) {
    return <Error statusCode={404} />
  }
  return (
    <>
      <NoIndex />
      <MaintenanceChannelsShow id={parseInt(id)} />
    </>
  )
}

export default Show
