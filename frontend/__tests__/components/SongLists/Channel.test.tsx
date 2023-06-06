import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Channel, ChannelProps } from '@/components/SongLists/Channel'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'
import { Thumbnails } from '@/resources/types'

jest.mock('next/image')
describe('<Channel />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ChannelProps>({
      channel: {
        name: 'Test Channel',
        thumbnails: {
          default: {
            url: '',
          },
        },
      },
    })
    const { getByTestId, getByText } = render(<Channel {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.CHANNEL)).toBeTruthy()
      expect(getByText('Test Channel')).toBeTruthy()
    })
  })
})
