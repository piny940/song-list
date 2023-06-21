import { Inquiry } from '@/containers/Inquiry'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

describe('<Inquiry />', () => {
  it('Inquiryが正常に描画される', async () => {
    const component = render(<Inquiry />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
