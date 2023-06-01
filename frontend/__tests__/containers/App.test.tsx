import { App } from '@/containers/App'
import { TestID } from '@/resources/TestID'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

describe('<App />', () => {
  it('Appが正常に描画される', async () => {
    const { getByTestId } = render(<App />)

    await waitFor(() => {
      expect(getByTestId(TestID.APP)).toBeTruthy()
    })
  })
})
