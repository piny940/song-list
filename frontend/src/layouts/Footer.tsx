import { useTheme } from '@/context/ThemeProvider'
import { useLogout } from '@/hooks/session'
import { useUser } from '@/hooks/user'
import Link from 'next/link'

export const Footer: React.FC = () => {
  const { data } = useUser()
  const { logout } = useLogout()
  const { theme } = useTheme()

  return (
    <footer
      className={
        'footer text-center text-white p-4 ' +
        (theme === 'light' ? 'bg-secondary' : 'bg-body-secondary')
      }
    >
      {data?.user && (
        <>
          <Link href="/maintenance" className="text-white">
            メンテナンスする
          </Link>
          ｜
        </>
      )}
      <Link href="/about" className="text-white">
        このサイトについて
      </Link>
      ｜
      <Link href="/inquiry" className="text-white">
        お問い合わせ
      </Link>
      {data?.user && (
        <>
          ｜<button onClick={logout}>ログアウト</button>
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
    </footer>
  )
}
