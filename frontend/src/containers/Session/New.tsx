import Link from 'next/link'

export const SessionNew: React.FC = () => {
  return (
    <div className="">
      <h1>ログイン</h1>
      <form className="container">
        <div className="row my-3">
          <div className="col-md-3 fw-bold col-form-label">メールアドレス</div>
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
          <div className="col-md-3 fw-bold col-form-label">パスワード</div>
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
        <div className="">
          <Link href="/" className="text-primary py-0">
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
