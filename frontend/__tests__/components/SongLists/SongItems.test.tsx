import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { SongItems, SongItemsProps } from '@/components/SongLists/SongItems'
import { TestID } from '@/resources/TestID'
import { Mock } from 'ts-mockery'
import { SongItemType, VideoType } from '@/resources/types'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
  }),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      song_items: [
        Mock.from<SongItemType>({
          id: 1000,
          video: Mock.from<VideoType>({ video_id: 'hoge' }),
          time: '00:22:33',
        }),
        Mock.from<SongItemType>({
          id: 1001,
          video: Mock.from<VideoType>({ video_id: 'fuga' }),
          time: '00:22:33',
        }),
      ],
      total_pages: 1,
    },
  }))
)

describe('<SongItems />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<SongItemsProps>()
    const { getByTestId, getAllByTestId } = render(<SongItems {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.SONG_ITEMS)).toBeTruthy()
      expect(getAllByTestId(TestID.SONG_ITEM).length).toBe(2)
    })
  })
})
