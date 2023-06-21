import { SessionNew } from '@/containers/Session/New'
import { TestID } from '@/resources/TestID'
import { render, waitFor } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<SessionNew />', () => {
  it('SessionNewが正常に描画される', async () => {
    const { getByTestId } = render(<SessionNew />)

    await waitFor(() => {
      expect(getByTestId(TestID.SESSION_NEW)).toBeTruthy()
    })
  })
})
