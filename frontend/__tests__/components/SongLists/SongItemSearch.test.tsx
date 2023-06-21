import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  SongItemsSearch,
  SongItemsSearchProps,
} from '@/components/SongLists/SongItemsSearch'
import { Mock } from 'ts-mockery'

describe('<SongItemSearch />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<SongItemsSearchProps>()
    const component = render(<SongItemsSearch {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
