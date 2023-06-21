import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  NewSongDiff,
  NewSongDiffProps,
} from '@/components/SongLists/NewSongDiff'
import { Mock } from 'ts-mockery'
import { SongItemType } from '@/resources/types'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
  }),
}))

describe('<NewSongDiff />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<NewSongDiffProps>({
      songItem: Mock.all<SongItemType>(),
    })
    const component = render(<NewSongDiff {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
