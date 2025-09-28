import { render, waitFor } from '@testing-library/react'
import {
  ContentOpener,
  ContentOpenerProps,
} from '@/components/Common/ContentOpener'
import { Mock } from 'ts-mockery'

describe('<ContentOpener />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ContentOpenerProps>({})
    const component = render(<ContentOpener {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
