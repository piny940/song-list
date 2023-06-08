import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Loading } from '@/components/Common/Loading'

describe('<Loading />', () => {
  it('正常に描画される', async () => {
    const component = render(<Loading />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
