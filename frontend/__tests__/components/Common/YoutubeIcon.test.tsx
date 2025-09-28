import { render, waitFor } from '@testing-library/react'
import { YoutubeIcon } from '@/components/Common/YoutubeIcon'

jest.mock('next/link')

describe('<YoutubeIcon />', () => {
  it('正常に描画される', async () => {
    const component = render(<YoutubeIcon />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
