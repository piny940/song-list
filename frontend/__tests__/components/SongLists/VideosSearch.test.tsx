import {
  act,
  fireEvent,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  VideosSearch,
  VideosSearchProps,
} from '@/components/SongLists/VideosSearch'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'

describe('<VideosSearch />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<VideosSearchProps>({})
    const { getByTestId } = render(<VideosSearch {...props} />)
    await waitFor(() => {
      expect(queryByText(getByTestId(TestID.VIDEOS_SEARCH), '枠名')).toBeNull()
    })
    act(() => {
      // 詳細検索を開く
      fireEvent.click(getByTestId(TestID.VIDEO_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(
        queryByText(getByTestId(TestID.VIDEOS_SEARCH), '枠名')
      ).toBeTruthy()
    })
    act(() => {
      // 詳細検索を閉じる
      fireEvent.click(getByTestId(TestID.VIDEO_SEARCH_DETAIL_BUTTON))
    })
    await waitFor(() => {
      expect(queryByText(getByTestId(TestID.VIDEOS_SEARCH), '枠名')).toBeNull()
    })
  })
})
