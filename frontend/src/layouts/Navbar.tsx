import { TestID } from '@/resources/TestID'
import { UserType } from '@/resources/types'
import { getData } from '@/utils/api'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import useSWR from 'swr'

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
  const { data, error } = useSWR<{ user: UserType }>('/user', getData)

  const isMaintenance = () => router.asPath.includes('maintenance')
  if (error) return <Error statusCode={400} />
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
          <ul className="d-flex justify-content-between navbar-nav w-100 mx-3">
            <li className="nav-item">
              {isMaintenance() ? (
                <Link href="/maintenance" className="nav-link">
                  チャンネル一覧
                </Link>
              ) : (
                <Link href="/channels" className="nav-link">
                  チャンネル一覧
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isMaintenance() ? (
                <MaintenanceModeDiv className="d-none d-lg-block border border-primary border-3 rounded nav-link fw-bold">
                  <Link href="/" className="text-dark">
                    メンテナンスモード
                  </Link>
                </MaintenanceModeDiv>
              ) : (
                <Link href="/maintenance" className="nav-link">
                  {!!data && !!data.user
                    ? 'メンテナンスする'
                    : 'メンテナンスに参加する'}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
