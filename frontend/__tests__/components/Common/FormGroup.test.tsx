import { render, waitFor } from '@testing-library/react'
import { FormGroup, FormGroupProps } from '@/components/Common/FormGroup'
import { Mock } from 'ts-mockery'

describe('<FormGroup />', () => {
  it('正常に描画される', async () => {
    const register = jest.fn()

    const props = Mock.from<FormGroupProps>({
      register: register,
    })
    const component = render(<FormGroup {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(register).toHaveBeenCalled()
    })
  })
})
