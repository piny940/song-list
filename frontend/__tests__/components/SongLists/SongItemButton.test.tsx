import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  SongItemButton,
  SongItemButtonProps,
} from '@/components/SongLists/SongItemButton'
import { Mock } from 'ts-mockery'
import { SongItemType, VideoType } from '@/resources/types'
import { TestID } from '@/resources/TestID'

describe('<SongItemButton />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SongItemButtonProps>({
      songItem: Mock.from<SongItemType>({
        id: 1010,
        video: Mock.all<VideoType>(),
        time: '00:22:33',
      }),
    })
    const { getByTestId } = render(<SongItemButton {...props} />)
    await waitFor(() => {
      expect(getByTestId(TestID.SONG_ITEM)).toBeTruthy()
    })
  })
})
