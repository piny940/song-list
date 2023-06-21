import { ChannelsIndex } from '@/containers/Channels/Index'
import { render, waitFor } from '@testing-library/react'

describe('<ChannelsIndex />', () => {
  it('ChannelsIndexが正常に描画される', async () => {
    const component = render(<ChannelsIndex />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
