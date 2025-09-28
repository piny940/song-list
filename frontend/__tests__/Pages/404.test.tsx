import { render, waitFor } from '@testing-library/react'
import Custom404 from '@/pages/404'
import { TestID } from '@/resources/TestID'

describe('404 Page', () => {
  it('404ページが正常に表示される', async () => {
    const { getByTestId } = render(<Custom404 />)

    await waitFor(() => {
      expect(getByTestId(TestID.CUSTOM404)).toBeTruthy()
    })
  })
})
