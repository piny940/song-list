import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  ChannelsList,
  ChannelsListProps,
} from '@/components/SongLists/Channels'
import { Mock } from 'ts-mockery'
import { Channel } from '@/resources/types'
import { TestID } from '@/resources/TestID'

jest.mock('swr', () =>
  jest.fn(() => ({
    data: [
      Mock.from<Channel>({
        id: 9000,
        name: 'test9000',
      }),
      Mock.from<Channel>({
        id: 9001,
        name: 'test9001',
      }),
    ],
  }))
)

describe('<Channels />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ChannelsListProps>({
      testID: 'testid',
    })

    const { getByTestId, getAllByTestId } = render(<ChannelsList {...props} />)
    await waitFor(() => {
      expect(getByTestId('testid')).toBeTruthy()
      expect(getAllByTestId(TestID.CHANNEL).length).toBe(2)
    })
  })
})
