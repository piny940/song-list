import { Inquiry } from '@/containers/Inquiry'
import { TestID } from '@/resources/TestID'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

describe('<Inquiry />', () => {
  it('Inquiryが正常に描画される', async () => {
    const { getByTestId } = render(<Inquiry />)

    await waitFor(() => {
      expect(getByTestId(TestID.INQUIRY)).toBeTruthy()
    })
  })
})
