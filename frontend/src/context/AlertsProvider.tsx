import { createContext, ReactNode, useContext, useState } from 'react'
import { Alert, AlertInput } from '../resources/types'
import { usePageChange } from '../hooks/common'

interface AlertsContextInterface {
  alerts: Alert[]
  addAlert: (alert: AlertInput) => void
  removeAlert: (id: number) => void
  setAlerts: (...alerts: AlertInput[]) => void
}

const defaultAlertState: AlertsContextInterface = {
  alerts: [],
  addAlert: (alert: AlertInput) => undefined,
  removeAlert: (id: number) => undefined,
  setAlerts: (...alerts: AlertInput[]) => undefined,
}

const AlertsContext = createContext(defaultAlertState)

const useAlerts = () => useContext(AlertsContext)

interface AlertsProviderProps {
  children: ReactNode
}

const CLOSE_TIME = 3000
const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [nextAlertId, setNextAlertId] = useState(0)

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const _reserveRemoval = (id: number) => {
    setTimeout(() => {
      removeAlert(id)
    }, CLOSE_TIME)
  }

  const addAlert = (alert: AlertInput) => {
    const newAlert: Alert = {
      ...alert,
      id: nextAlertId,
    }
    setAlerts([...alerts, newAlert])
    _reserveRemoval(nextAlertId)
    setNextAlertId(nextAlertId + 1)
  }

  const _setAlerts = (...alerts: AlertInput[]) => {
    const newAlerts: Alert[] = []
    let nextId = nextAlertId
    for (const alert of alerts) {
      newAlerts.push({
        content: alert.content,
        state: alert.state,
        id: nextId,
      })
      _reserveRemoval(nextId)
      nextId++
    }
    setAlerts(newAlerts)
    setNextAlertId(nextId)
  }

  const value: AlertsContextInterface = {
    alerts,
    addAlert,
    removeAlert,
    setAlerts: _setAlerts,
  }

  // Remove all alerts on page change
  usePageChange(() => {
    setAlerts([])
  })

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  )
}

export { useAlerts, AlertsProvider }
