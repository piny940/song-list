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
    void router.push('/') // TODO
  }

  return (
    <div className="">
      {alert && <div className="alert alert-danger">{alert}</div>}
      <h1>アカウント作成</h1>
      <form className="container" onSubmit={handleSubmit(submit)}>
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">
            メールアドレス
            <span className="text-danger">*</span>
          </div>
          <div className="col-md-9">
            <input
              type="email"
              {...register('email', { required: 'このフィールドは必須です。' })}
              className="form-control"
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">
            名前
            <span className="text-danger">*</span>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              {...register('name', { required: 'このフィールドは必須です。' })}
              className="form-control"
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">
            パスワード<span className="text-danger">*</span>
          </div>
          <div className="col-md-9">
            <input
              type="password"
              className="form-control"
              {...register('password', {
                required: 'このフィールドは必須です。',
              })}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">
            パスワード(確認用)<span className="text-danger">*</span>
          </div>
          <div className="col-md-9">
            <input
              type="password"
              className="form-control"
              {...register('password_confirmation', {
                required: 'このフィールドは必須です。',
              })}
            />
          </div>
        </div>
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
