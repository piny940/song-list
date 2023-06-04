import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  ListItemButton,
  ListItemButtonProps,
} from '../../../src/components/Common/ListItemButton'
import { Mock } from 'ts-mockery'

describe('<ListItemButton />', () => {
  it('正常に描画される', async () => {
    const onClick = jest.fn()
    const props = Mock.from<ListItemButtonProps>({
      testID: 'test',
      onClick: onClick,
    })
    const { getByTestId } = render(<ListItemButton {...props} />)

    await waitFor(() => {
      expect(getByTestId('test')).toBeTruthy()
      expect(onClick).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId('test'))
    })
    await waitFor(() => {
      expect(onClick).toBeCalledTimes(1)
    })
  })
})
