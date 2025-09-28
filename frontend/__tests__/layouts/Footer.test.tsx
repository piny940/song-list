import { render, waitFor } from '@testing-library/react'
import { Footer } from '@/layouts/Footer'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<Footer />', () => {
  it('正常に描画される', async () => {
    const component = render(<Footer />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
