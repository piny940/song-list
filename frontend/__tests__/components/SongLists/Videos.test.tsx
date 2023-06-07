import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Videos, VideosProps } from '@/components/SongLists/Videos'
import { Mock } from 'ts-mockery'
import { Channel, Video } from '@/resources/types'
import { TestID } from '@/resources/TestID'

jest.mock('next/image')
jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      videos: [
        Mock.from<Video>({
          id: 1000,
          thumbnails: {
            medium: {
              url: '',
            },
          },
        }),
        Mock.from<Video>({
          id: 1001,
          thumbnails: {
            medium: {
              url: '',
            },
          },
        }),
      ],
    },
  }))
)

describe('<Videos />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<VideosProps>({
      channel: Mock.all<Channel>(),
    })
    const { getByTestId, getAllByTestId } = render(<Videos {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.VIDEOS)).toBeTruthy()
      expect(getAllByTestId(TestID.VIDEO).length).toBe(2)
    })
  })
})
