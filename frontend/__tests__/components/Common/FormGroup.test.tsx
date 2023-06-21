import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { FormGroup, FormGroupProps } from '@/components/Common/FormGroup'
import { Mock } from 'ts-mockery'

describe('<FormGroup />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<FormGroupProps>()
    const component = render(<FormGroup {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
