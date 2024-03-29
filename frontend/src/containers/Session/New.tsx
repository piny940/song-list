import { FormGroup } from '@/components/Common/FormGroup'
import { useAlerts } from '@/context/AlertsProvider'
import { useUser } from '@/hooks/user'
import { AlertState } from '@/resources/enums'
import { fetchApi } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export const SessionNew: React.FC = () => {
  const { addAlert } = useAlerts()
  const { mutate } = useUser({ isPaused: () => true })
  const router = useRouter()
  const [alert, setAlert] = useState('')
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const response = await fetchApi({
      url: '/session',
      method: 'POST',
      data: data,
    })
    const json = await response.json()
    if (response.status >= 400) {
      setAlert(json.message)
      return
    }
    // mutateはpush前でないといけない
    await mutate()
    await router.push('/maintenance')
    addAlert({
      state: AlertState.NOTICE,
      content: 'ログインしました。',
    })
  }

  return (
    <div className="session-new">
      {alert && <div className="alert alert-danger">{alert}</div>}
      <h1>ログイン</h1>
      <form className="container" onSubmit={handleSubmit(submit)}>
        <FormGroup
          register={register}
          label="ニックネーム"
          type="text"
          required
          name="name"
        />
        <FormGroup
          register={register}
          label="パスワード"
          type="password"
          required
          name="password"
        />
        <div className="">
          <Link href="/user/new" className="py-0">
            &gt;アカウント新規作成
          </Link>
        </div>
        <div className="row mt-2">
          <button type="submit" className="btn btn-primary">
            ログイン
          </button>
        </div>
      </form>
    </div>
  )
}
