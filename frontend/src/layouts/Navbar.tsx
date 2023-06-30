import { MaterialIcon } from '@/components/Common/MaterialIcon'
import { ThemeToggler } from '@/components/Common/ThemeToggler'
import { useTheme } from '@/context/ThemeProvider'
import { useUser } from '@/hooks/user'
import { TestID } from '@/resources/TestID'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'

const MaintenanceModeDiv = styled.div`
  height: 40px;
  padding-top: 6px;
  background-color: rgb(188, 229, 255);
`

const SpannerButton = styled.button`
  background-color: rgb(188, 229, 255);
`

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { data, error } = useUser()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const isMaintenance = () => router.asPath.includes('maintenance')
  if (error) return <Error statusCode={400} />
  return (
    <nav
      data-testid={TestID.NAVBAR}
      className={
        'navbar navbar-expand-lg ' +
        (theme === 'light' ? 'navbar-light bg-light ' : 'navbar-dark bg-dark')
      }
    >
      <div className="container-fluid px-5">
        <Link
          href="/"
          className="title fw-bold d-flex align-items-center text-body"
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
        {isMaintenance() ? (
          <SpannerButton
            className="navbar-toggler border border-3 border-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-collapse-target"
          >
            <Image
              src="/images/spanner.png"
              width={34}
              height={34}
              alt="Spanner"
            />
          </SpannerButton>
        ) : (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-collapse-target"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        <div className="collapse navbar-collapse" id="navbar-collapse-target">
          <div className="d-flex justify-content-between navbar-nav w-100 mx-3">
            <div className="nav-item">
              {isMaintenance() ? (
                <Link href="/maintenance" className="nav-link">
                  チャンネル一覧
                </Link>
              ) : (
                <Link href="/channels" className="nav-link">
                  チャンネル一覧
                </Link>
              )}
            </div>
            <div className="d-flex">
              <div className="nav-item">
                {isMaintenance() ? (
                  <MaintenanceModeDiv className="d-none d-lg-block border border-primary border-3 rounded nav-link fw-bold">
                    <Link href="/" className="text-dark">
                      メンテナンスモード
                    </Link>
                  </MaintenanceModeDiv>
                ) : (
                  data?.user && (
                    <Link href="/maintenance" className="nav-link">
                      メンテナンスする
                    </Link>
                  )
                )}
              </div>
              <div className="nav-item d-none d-lg-block">
                <div className="nav-link p-0">
                  <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </div>
              </div>
            </div>
            <div className="nav-item d-lg-none">
              <a
                type="button"
                onClick={toggleTheme}
                className="nav-link d-flex align-items-center"
              >
                {theme === 'light' ? (
                  <>
                    <MaterialIcon className="me-1" name="light_mode" />
                    ライトモード
                  </>
                ) : (
                  <>
                    <MaterialIcon className="me-1" name="dark_mode" />
                    ダークモード
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
