import { useAlerts } from '@/context/AlertsProvider'
import { Alert } from './Alert'
import styles from '@/styles/common.module.scss'

export const Alerts: React.FC = () => {
  const { alerts, removeAlert } = useAlerts()

  if (alerts.length === 0) {
    return <></>
  }

  return (
    <div id={styles.alerts}>
      {alerts.map((alert, idx) => (
        <Alert
          margin={idx === 0 ? 'm-0' : 'mt-1'}
          alert={alert}
          removeAlert={removeAlert}
          key={alert.id}
        />
      ))}
    </div>
  )
}
