import { render, waitFor } from '@testing-library/react'
import { Layout } from '@/layouts/Layout'
import { TestComponent } from '../testHelpers/mock'

jest.mock('@/layouts/Footer')
jest.mock('@/layouts/Navbar')

describe('<Layout />', () => {
  it('正常に描画される', async () => {
    const testId = 'testid'

    const { getByTestId } = render(
      <Layout>
        <TestComponent testID={testId} />
      </Layout>
    )

    await waitFor(() => {
      expect(getByTestId(testId)).toBeTruthy()
    })
  })
})
