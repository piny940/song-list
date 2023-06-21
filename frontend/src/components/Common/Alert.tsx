import { TestID } from '../../resources/TestID'
import { Alert as AlertType } from '../../resources/types'
import { AlertState } from '../../resources/enums'
import styles from '../../styles/common.module.scss'
import { toClass } from '../../utils/helpers'
import { MouseEventHandler } from 'react'
import { MaterialIcon } from './MaterialIcon'

export interface AlertProps {
  alert: AlertType
  margin: 'm-0' | 'mt-1'
  removeAlert: (id: number) => void
}

export const Alert: React.FC<AlertProps> = ({ alert, margin, removeAlert }) => {
  let className = ''
  switch (alert.state) {
    case AlertState.DANGER:
      className = 'alert alert-danger'
      break
    case AlertState.NOTICE:
      className = 'alert alert-info'
      break
    case AlertState.SUCCESS:
      className = 'alert alert-success'
      break
  }

  const close: MouseEventHandler = (e) => {
    removeAlert(alert.id)
  }

  return (
    <div
      className={toClass(
        className,
        styles.alert,
        margin,
        'd-flex align-items-center justify-content-between'
      )}
      data-testid={TestID.ALERT}
    >
      <div>{alert.content}</div>
      <a role="button" onClick={close} data-testid={TestID.ALERT_CLOSE}>
        <MaterialIcon name="close" />
      </a>
    </div>
  )
}
