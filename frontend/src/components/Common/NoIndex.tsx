import Head from 'next/head'

export const NoIndex: React.FC = () => {
  return (
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
  )
}
