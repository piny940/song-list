import Head from 'next/head'
import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div data-bs-theme={theme} className="vh-100 bg-body text-body">
      <Head>
        <title>Next Template</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="container mt-3">{children}</main>
    </div>
  )
}
