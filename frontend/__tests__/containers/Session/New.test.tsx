import { SessionNew } from '@/containers/Session/New'
import { render, waitFor } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<SessionNew />', () => {
  it('SessionNewが正常に描画される', async () => {
    const component = render(<SessionNew />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
