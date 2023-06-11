import { FormGroup } from '@/components/Common/FormGroup'
import { fetchApi } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export const UserNew: React.FC = () => {
  const [alert, setAlert] = useState('')
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const submit: SubmitHandler<FieldValues> = async (data) => {
    setAlert('')
    const response = await fetchApi({
      url: '/user',
      method: 'POST',
      data: {
        user: data,
      },
    })
    const json = await response.json()
    if (response.status >= 400) {
      setAlert(json.message)
      return
    }
    void router.push('/maintenance')
  }

  return (
    <div className="">
      {alert && <div className="alert alert-danger">{alert}</div>}
      <h1>アカウント作成</h1>
      <form className="container" onSubmit={handleSubmit(submit)}>
        <FormGroup
          label="メールアドレス"
          register={register}
          type="email"
          name="email"
          required
        />
        <FormGroup
          label="名前"
          register={register}
          type="text"
          name="name"
          required
        />
        <FormGroup
          label="パスワード"
          register={register}
          type="password"
          name="password_confirmation"
          required
        />
        <FormGroup
          label="パスワード(確認用)"
          register={register}
          type="password"
          name="password_confirmation"
          required
        />
        <div className="">
          <Link href="/session/new" className="text-primary py-0">
            &gt;アカウントをすでにお持ちの場合はこちら
          </Link>
        </div>
        <div className="row mt-2">
          <button type="submit" className="btn btn-primary">
            送信
          </button>
        </div>
      </form>
    </div>
  )
}
