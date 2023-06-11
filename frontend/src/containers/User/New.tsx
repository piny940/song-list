import Link from 'next/link'

export const UserNew: React.FC = () => {
  return (
    <div className="">
      <h1>アカウント作成</h1>
      <form className="container">
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">
            メールアドレス
            <span className="text-danger">*</span>
          </div>
          <div className="col-md-9">
            <input
              type="email"
              name="email"
              id=""
              className="form-control"
              required
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
              name="name"
              id=""
              className="form-control"
              required
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
              name="password"
              id=""
              className="form-control"
              required
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
              name="password_confirmation"
              id=""
              className="form-control"
              required
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
