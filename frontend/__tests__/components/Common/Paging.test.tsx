import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Paging, PagingProps } from '@/components/Common/Paging'
import { Mock } from 'ts-mockery'

describe('<Paging />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<PagingProps>({ totalPages: 0 })
    const component = render(<Paging {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
