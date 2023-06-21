import { useLogout } from '@/hooks/session'
import { useUser } from '@/hooks/user'
import Link from 'next/link'
import { styled } from 'styled-components'

const FooterTag = styled.footer`
  margin-top: 20px;
  position: sticky;
  top: 100vh;
`

export const Footer: React.FC = () => {
  const { data } = useUser()
  const { logout } = useLogout()

  return (
    <FooterTag className="footer text-center bg-secondary text-white p-4">
      <Link href="/maintenance" className="text-white">
        {data?.user ? 'メンテナンスする' : 'メンテナンスに参加する'}
      </Link>
      ｜
      <Link href="/inquiry" className="text-white">
        お問い合わせ
      </Link>
      {data?.user && (
        <>
          ｜
          <a type="button" onClick={logout}>
            ログアウト
          </a>
        </>
      )}
      <br />
      <small>
        &copy;2023
        <Link
          className="text-white"
          href="https://github.com/piny940"
          target="_blank"
        >
          piny940
        </Link>
      </small>
    </FooterTag>
  )
}
