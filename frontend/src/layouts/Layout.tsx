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
    <div data-bs-theme={theme} className="vh-100 bg-body text-body">
      <Head>
        <title>歌枠データベース</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <Alerts />
      <main className="container mt-3">{children}</main>
      <Footer />
    </div>
  )
}
