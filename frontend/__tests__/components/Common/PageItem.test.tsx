import { render, waitFor } from '@testing-library/react'
import { PageItem, PageItemProps } from '@/components/Common/PageItem'
import { Mock } from 'ts-mockery'

describe('<PageItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<PageItemProps>({})
    const component = render(<PageItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
