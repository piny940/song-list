import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  SongItemsSearch,
  SongItemsSearchProps,
} from '@/components/SongLists/SongItemsSearch'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'

describe('<SongItemSearch />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<SongItemsSearchProps>()
    const { queryByText, getByTestId } = render(<SongItemsSearch {...props} />)
    await waitFor(() => {
      expect(queryByText('枠名')).toBeNull()
    })
    act(() => {
      // 詳細検索を開く
      fireEvent.click(getByTestId(TestID.SONG_ITEMS_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(queryByText('枠名')).toBeTruthy()
    })
    act(() => {
      // 詳細検索を閉じる
      fireEvent.click(getByTestId(TestID.SONG_ITEMS_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(queryByText('枠名')).toBeNull()
    })
  })
})
