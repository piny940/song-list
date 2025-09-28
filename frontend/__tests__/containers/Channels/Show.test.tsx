import { ChannelsShow } from '@/containers/Channels/Show'
import { render, waitFor } from '@testing-library/react'
import { ChannelType } from '@/resources/types'
import { Mock } from 'ts-mockery'

jest.mock('@/hooks/channel', () => ({
  useChannel: () => ({
    data: {
      channel: Mock.all<ChannelType>(),
    },
  }),
}))
jest.mock('@/components/SongLists/SongItems')
jest.mock('@/components/SongLists/Videos')

describe('<ChannelsShow />', () => {
  it('ChannelsShowが正常に描画される', async () => {
    const component = render(<ChannelsShow id={1} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
