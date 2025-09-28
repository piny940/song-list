import { render, waitFor } from '@testing-library/react'
import Custom500 from '@/pages/500'
import { TestID } from '@/resources/TestID'

describe('500 Page', () => {
  it('500ページが正常に表示される', async () => {
    const { getByTestId } = render(<Custom500 />)

    await waitFor(() => {
      expect(getByTestId(TestID.CUSTOM500)).toBeTruthy()
    })
  })
})
