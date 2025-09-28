import { render, waitFor } from '@testing-library/react'
import { ThemeToggler } from '@/components/Common/ThemeToggler'

describe('<ThemeToggler />', () => {
  it('正常に描画される', async () => {
    const component = render(<ThemeToggler />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
