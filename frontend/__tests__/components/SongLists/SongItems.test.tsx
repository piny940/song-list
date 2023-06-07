import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { SongItems } from '@/components/SongLists/SongItems'
import { TestID } from '@/resources/TestID'
import { Mock } from 'ts-mockery'
import { SongItemType } from '@/resources/types'

jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      song_items: [
        Mock.from<SongItemType>({
          id: 1000,
        }),
        Mock.from<SongItemType>({
          id: 1001,
        }),
      ],
    },
  }))
)

describe('<SongItems />', () => {
  it('正常に描画される', async () => {
    const { getByTestId, getAllByTestId } = render(<SongItems />)

    await waitFor(() => {
      expect(getByTestId(TestID.SONG_ITEMS)).toBeTruthy()
      expect(getAllByTestId(TestID.SONG_ITEM).length).toBe(2)
    })
  })
})
