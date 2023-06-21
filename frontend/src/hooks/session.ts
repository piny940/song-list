import { fetchApi } from '@/utils/api'
import { useRouter } from 'next/router'
import { useUser } from './user'
import { useAlerts } from '@/context/AlertsProvider'
import { AlertState } from '@/resources/enums'

export const useLogout = () => {
  const { addAlert } = useAlerts()
  const { mutate } = useUser({ isPaused: () => true })
  const router = useRouter()
  const logout = async () => {
    const response = await fetchApi({
      url: '/session',
      method: 'DELETE',
    })
    if (response.status >= 400) return

    addAlert({
      content: 'ログアウトしました。',
      state: AlertState.NOTICE,
    })

    // push, mutate, addAlertはこの順じゃないと上手く行かない
    void router.push('/')
    await mutate()
    addAlert({
      content: 'ログアウトしました。',
      state: AlertState.NOTICE,
    })
  }

  return { logout }
}
