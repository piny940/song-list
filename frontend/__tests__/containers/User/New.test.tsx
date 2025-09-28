import { UserNew } from '@/containers/User/New'
import { render, waitFor } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<UserNew />', () => {
  it('UserNewが正常に描画される', async () => {
    const component = render(<UserNew />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
