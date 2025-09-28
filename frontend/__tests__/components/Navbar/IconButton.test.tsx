import { IconButton, IconButtonProps } from '@/components/Navbar/IconButton'
import { TestID } from '@/resources/TestID'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<IconButton />', () => {
  it('正常に描画される', async () => {
    const onClick = jest.fn()
    const props = Mock.from<IconButtonProps>({
      onClick: onClick,
    })

    const { getByTestId } = render(<IconButton {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.PROFILE_BUTTON)).toBeTruthy()
      expect(onClick).not.toHaveBeenCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(TestID.PROFILE_BUTTON))
    })
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
