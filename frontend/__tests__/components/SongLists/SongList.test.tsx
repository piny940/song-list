import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { SongList, SongListProps } from '@/components/SongLists/SongList'
import { Mock } from 'ts-mockery'
import { SongItemType, VideoType } from '@/resources/types'
import { TestID } from '@/resources/TestID'

jest.mock('@/hooks/songItem', () => ({
  useSongItems: () => ({
    data: {
      song_items: [
        Mock.from<SongItemType>({
          id: 1001,
          time: '00:22:33',
          video: Mock.all<VideoType>(),
        }),
        Mock.from<SongItemType>({
          id: 1002,
          time: '00:22:33',
          video: Mock.all<VideoType>(),
        }),
      ],
    },
  }),
}))

describe('<SongList />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SongListProps>({
      video: Mock.all<VideoType>(),
    })
    const { getAllByTestId } = render(<SongList {...props} />)
    await waitFor(() => {
      expect(getAllByTestId(TestID.SONG_LIST_ITEM).length).toBe(2)
    })
  })
})
