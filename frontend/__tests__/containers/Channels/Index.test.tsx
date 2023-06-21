import { ChannelsIndex } from '@/containers/Channels/Index'
import { TestID } from '@/resources/TestID'
import { render, waitFor } from '@testing-library/react'

describe('<ChannelsIndex />', () => {
  it('ChannelsIndexが正常に描画される', async () => {
    const { getByTestId } = render(<ChannelsIndex />)

    await waitFor(() => {
      expect(getByTestId(TestID.CHANNELS_INDEX)).toBeTruthy()
    })
  })
})
