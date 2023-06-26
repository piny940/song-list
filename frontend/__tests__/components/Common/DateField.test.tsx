import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { DateField, DateFieldProps } from '@/components/Common/DateField'
import { Mock } from 'ts-mockery'

describe('<DateField />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<DateFieldProps>()
    const component = render(<DateField {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
