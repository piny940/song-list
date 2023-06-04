import { IconButton } from '@/components/Navbar/IconButton'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'

export const Navbar: React.FC = () => {
  return (
    <nav
      data-testid={TestID.NAVBAR}
      className="navbar navbar-expand navbar-light bg-light"
    >
      <div className="container-fluid px-5">
        <Link href="/" className="navbar-brand title fw-bold">
          Song Lists
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
