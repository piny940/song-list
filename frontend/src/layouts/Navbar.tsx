import { IconButton } from '@/components/Navbar/IconButton'
import { TestID } from '@/resources/TestID'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar: React.FC = () => {
  return (
    <nav
      data-testid={TestID.NAVBAR}
      className="navbar navbar-expand navbar-light bg-light"
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
        <div className="navbar-nav w-100 mx-3">
          <div className="nav-item">
            <Link href="/channels" className="nav-link">
              チャンネル一覧
            </Link>
          </div>
        </div>
        <IconButton theme="dark" onClick={() => undefined} />
      </div>
    </nav>
  )
}
