import { FormGroup } from '@/components/Common/FormGroup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export const SessionNew: React.FC = () => {
  const { register } = useForm({
    shouldUseNativeValidation: true,
  })

  return (
    <div className="">
      <h1>ログイン</h1>
      <form className="container">
        <FormGroup
          register={register}
          label="メールアドレス"
          type="email"
          required
          name="email"
        />
        <FormGroup
          register={register}
          label="パスワード"
          type="password"
          required
          name="password"
        />
        <div className="">
          <Link href="/user/new" className="text-primary py-0">
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
