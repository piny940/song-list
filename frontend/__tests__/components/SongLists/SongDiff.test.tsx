import { render, waitFor } from '@testing-library/react'
import { SongDiff, SongDiffProps } from '@/components/SongLists/SongDiff'
import { Mock } from 'ts-mockery'
import { SongDiffType } from '@/resources/types'

describe('<SongDiff />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SongDiffProps>({
      songDiff: Mock.from<SongDiffType>({
        id: 1001,
      }),
    })
    const component = render(<SongDiff {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
