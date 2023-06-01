import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Navbar } from '@/layouts/Navbar'
import { TestID } from '@/resources/TestID'

describe('<Navbar />', () => {
  it('正常に描画される', async () => {
    const { getByTestId } = render(<Navbar />)

    await waitFor(() => {
      expect(getByTestId(TestID.NAVBAR)).toBeTruthy()
    })
  })
})
