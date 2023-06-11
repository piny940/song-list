import { TestID } from '@/resources/TestID'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar: React.FC = () => {
  return (
    <nav
      data-testid={TestID.NAVBAR}
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div className="container-fluid px-5">
        <Link
          href="/"
          className="navbar-brand title fw-bold d-flex align-items-center"
        >
          <Image
            src="/images/icon.png"
            className="rounded-3"
            alt="icon"
            width={35}
            height={35}
          />
          <span className="ms-2">Song Lists</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-target"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapse-target">
          <ul className="d-flex justify-content-between navbar-nav w-100 mx-3">
            <li className="nav-item">
              <Link href="/channels" className="nav-link">
                チャンネル一覧
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/session/new" className="nav-link">
                メンテナンスに参加する
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
