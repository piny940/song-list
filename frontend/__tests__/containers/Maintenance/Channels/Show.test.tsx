import { MaintenanceChannelsShow } from '@/containers/Maintenance/Channels/Show'
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

describe('<MaintenanceChannelsShow />', () => {
  it('MaintenanceChannelsShowが正常に描画される', async () => {
    const component = render(<MaintenanceChannelsShow id={1} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
