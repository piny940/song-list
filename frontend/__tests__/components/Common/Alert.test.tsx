import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { TestID } from '@/resources/TestID'
import { AlertState } from '@/resources/enums'
import { expect } from '@jest/globals'
import { Alert, AlertProps } from '@/components/Common/Alert'
import { Mock } from 'ts-mockery'

jest.useFakeTimers()

describe('<Alert />', () => {
  it('SuccessのAlertが正常に表示され、closeボタンで削除できる', async () => {
    const removeAlert = jest.fn()

    const props = Mock.from<AlertProps>({
      alert: {
        state: AlertState.SUCCESS,
      },
      margin: 'm-0',
      removeAlert: removeAlert,
    })

    const { getByTestId } = render(<Alert {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.ALERT).classList).toContain('alert')
      expect(getByTestId(TestID.ALERT).classList).toContain('alert-success')
      expect(getByTestId(TestID.ALERT).classList).toContain('m-0')
    })

    act(() => {
      fireEvent.click(getByTestId(TestID.ALERT_CLOSE))
    })

    await waitFor(() => {
      expect(removeAlert).toBeCalled()
    })
  })
  it('時間経過で正常にAlertが削除される', async () => {
    const removeAlert = jest.fn()

    const props = Mock.of<AlertProps>({
      margin: 'm-0',
      removeAlert: removeAlert,
      alert: Mock.all(),
    })

    render(<Alert {...props} />)

    await waitFor(() => {
      expect(removeAlert).not.toBeCalled()
    })

    jest.advanceTimersByTime(5001)

    expect(removeAlert).toBeCalled()
  })
})
