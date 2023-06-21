import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  NewSongDiff,
  NewSongDiffProps,
} from '@/components/SongLists/NewSongDiff'
import { Mock } from 'ts-mockery'

describe('<NewSongDiff />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<NewSongDiffProps>()
    const component = render(<NewSongDiff {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
