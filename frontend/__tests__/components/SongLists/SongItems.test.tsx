import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { SongItems } from '@/components/SongLists/SongItems'

describe('<SongItems />', () => {
  it('正常に描画される', async () => {
    const { getByTestId } = render(<SongItems />)
  })
})
