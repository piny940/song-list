import Head from 'next/head'
import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import { Footer } from '@/layouts/Footer'
import { Alerts } from '@/components/Common/Alerts'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div data-bs-theme={theme} className="bg-body text-body root">
      <Head>
        <title>歌枠データベース Vtuberが歌った歌を検索</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <Alerts />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
