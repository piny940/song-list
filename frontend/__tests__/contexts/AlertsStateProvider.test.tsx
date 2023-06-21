import { renderHook, waitFor, act } from '@testing-library/react'
import { ReactNode } from 'react'
import { AlertsProvider, useAlerts } from '@/context/AlertsProvider'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { AlertInput } from '@/resources/types'

jest.useFakeTimers()
jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<AlertStateProvider />', () => {
  it('addAlert, removeAlert, setAlertが正常に動作する', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AlertsProvider>{children}</AlertsProvider>
    )
    const { result } = renderHook(() => useAlerts(), { wrapper })

    await waitFor(() => {
      expect(result.current.alerts.length).toBe(0)
    })

    // Test for setAlert
    act(() => {
      result.current.setAlerts(
        Mock.from<AlertInput>({ content: 'Test0' }),
        Mock.from<AlertInput>({ content: 'Test1' })
      )
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(2)
      expect(result.current.alerts[0].id).toBe(0)
    })

    // Test for addAlert
    act(() => {
      result.current.addAlert(Mock.from<AlertInput>({ content: 'Test2' }))
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(3)
      expect(result.current.alerts[2].content).toBe('Test2')
      expect(result.current.alerts[2].id).toBe(2)
    })

    // Test for removeAlert
    act(() => {
      const alertToRemove = result.current.alerts[1]
      result.current.removeAlert(alertToRemove.id)
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(2)
      expect(result.current.alerts[1].content).toBe('Test2')
    })
  })
})
