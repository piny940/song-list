import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../layouts/Layout'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import Head from 'next/head'
import { AlertsProvider } from '@/context/AlertsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <ThemeProvider>
      <AlertsProvider>
        <Head>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertsProvider>
    </ThemeProvider>
  )
}

export default MyApp
