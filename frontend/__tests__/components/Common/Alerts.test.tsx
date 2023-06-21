import { render, waitFor } from '@testing-library/react'
import { Alerts } from '@/components/Common/Alerts'
import { TestID } from '@/resources/TestID'
import { Alert } from '@/resources/types'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

jest.mock('@/context/AlertsProvider', () => {
  return {
    useAlerts(): { alerts: Alert[] } {
      return {
        alerts: [Mock.from<Alert>({ id: 0 }), Mock.from<Alert>({ id: 1 })],
      }
    },
  }
})

describe('<Alerts />', () => {
  it('正常に描画される', async () => {
    const { getAllByTestId } = render(<Alerts />)

    await waitFor(() => {
      expect(getAllByTestId(TestID.ALERT).length).toBe(2)
      expect(getAllByTestId(TestID.ALERT)[0].classList).toContain('m-0')
      expect(getAllByTestId(TestID.ALERT)[1].classList).toContain('mt-1')
    })
  })
})
