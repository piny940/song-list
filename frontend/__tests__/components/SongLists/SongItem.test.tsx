import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { SongItem, SongItemProps } from '@/components/SongLists/SongItem'
import { Mock } from 'ts-mockery'
import { SongItemType, VideoType } from '@/resources/types'
import { TestID } from '@/resources/TestID'

describe('<SongItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SongItemProps>({
      songItem: Mock.from<SongItemType>({
        id: 1010,
        video: Mock.all<VideoType>(),
      }),
    })
    const { getByTestId } = render(<SongItem {...props} />)
    await waitFor(() => {
      expect(getByTestId(TestID.SONG_ITEM)).toBeTruthy()
    })
  })
})
