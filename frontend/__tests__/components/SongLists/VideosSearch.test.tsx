import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  VideosSearch,
  VideosSearchProps,
} from '@/components/SongLists/VideosSearch'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'

describe('<VideosSearch />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<VideosSearchProps>({})
    const { getByTestId, queryByText } = render(<VideosSearch {...props} />)
    await waitFor(() => {
      expect(queryByText('枠名')).toBeNull()
    })
    act(() => {
      // 詳細検索を開く
      fireEvent.click(getByTestId(TestID.VIDEO_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(queryByText('枠名')).toBeTruthy()
    })
    act(() => {
      // 詳細検索を閉じる
      fireEvent.click(getByTestId(TestID.VIDEO_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(queryByText('枠名')).toBeNull()
    })
  })
})
