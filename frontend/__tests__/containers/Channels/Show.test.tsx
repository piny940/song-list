import { ChannelsShow } from '@/containers/Channels/Show'
import { TestID } from '@/resources/TestID'
import { render, waitFor } from '@testing-library/react'

describe('<ChannelsShow />', () => {
  it('ChannelsShowが正常に描画される', async () => {
    const { getByTestId } = render(<ChannelsShow id={1} />)

    await waitFor(() => {
      expect(getByTestId(TestID.CHANNELS_SHOW)).toBeTruthy()
    })
  })
})
