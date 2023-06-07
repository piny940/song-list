import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  ChannelsList,
  ChannelsListProps,
} from '@/components/SongLists/Channels'
import { Mock } from 'ts-mockery'
import { ChannelType } from '@/resources/types'

jest.mock('next/image')
jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      channels: [
        Mock.from<ChannelType>({
          id: 9000,
          name: 'test9000',
          thumbnails: {
            default: {
              url: '',
            },
          },
        }),
        Mock.from<ChannelType>({
          id: 9001,
          name: 'test9001',
          thumbnails: {
            default: {
              url: '',
            },
          },
        }),
      ],
    },
  }))
)

describe('<Channels />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ChannelsListProps>({
      testID: 'testid',
    })

    const { getByTestId } = render(<ChannelsList {...props} />)
    await waitFor(() => {
      expect(getByTestId('testid')).toBeTruthy()
      expect(getByTestId('testid').children.length).toBe(2)
    })
  })
})
