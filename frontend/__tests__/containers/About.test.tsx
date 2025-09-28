import { About } from '@/containers/About'
import { render, waitFor } from '@testing-library/react'

describe('<About />', () => {
  it('Aboutが正常に描画される', async () => {
    const component = render(<About />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
