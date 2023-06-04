import { Home } from '@/containers/Home'
import { TestID } from '@/resources/TestID'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

describe('<Home />', () => {
  it('Homeが正常に描画される', async () => {
    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      expect(getByTestId(TestID.HOME)).toBeTruthy()
    })
  })
})
