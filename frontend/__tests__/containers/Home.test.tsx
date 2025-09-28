import { Home } from '@/containers/Home'
import { render, waitFor } from '@testing-library/react'

describe('<Home />', () => {
  it('Homeが正常に描画される', async () => {
    const component = render(<Home />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
