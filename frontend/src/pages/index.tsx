import type { NextPage } from 'next'
import { ChannelsIndex } from '@/containers/Channels/Index'
import { NoIndex } from '@/components/Common/NoIndex'

const Index: NextPage = () => {
  return (
    <>
      <NoIndex />
      <ChannelsIndex />
    </>
  )
}

export default Index
