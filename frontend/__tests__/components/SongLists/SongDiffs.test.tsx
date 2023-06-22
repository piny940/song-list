import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { SongDiffs, SongDiffsProps } from '@/components/SongLists/SongDiffs'
import { SongItemType } from '@/resources/types'
import { TestID } from '@/resources/TestID'

describe('<SongDiffs />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SongDiffsProps>({
      songItem: Mock.from<SongItemType>({
        id: 1001,
      }),
    })

    const { getAllByTestId } = render(<SongDiffs {...props} />)
    await waitFor(() => {
      expect(getAllByTestId(TestID.SONG_DIFF).length).toBeTruthy()
    })
  })
})
