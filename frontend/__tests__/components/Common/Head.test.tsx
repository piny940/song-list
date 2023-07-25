import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Head } from '@/components/Common/Head'

describe('<Head />', () => {
  it('正常に描画される', async () => {
    const component = render(<Head title="hoge" keywords={['hogehoge']} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
