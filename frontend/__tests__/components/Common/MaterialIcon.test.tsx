import { render, waitFor } from '@testing-library/react'
import {
  MaterialIcon,
  MaterialIconProps,
} from '@/components/Common/MaterialIcon'
import { Mock } from 'ts-mockery'

describe('<MaterialIcon />', () => {
  it('正常に描画される', async () => {
    const testID = 'testid'
    const props = Mock.from<MaterialIconProps>({
      name: 'test',
      color: 'red',
      testID: testID,
    })
    const { getByTestId } = render(<MaterialIcon {...props} />)

    await waitFor(() => {
      expect(getByTestId(testID)).toBeTruthy()
      expect(getByTestId(testID).textContent).toBe('test')
      expect(getByTestId(testID).style.color).toBe('red')
    })
  })
})
