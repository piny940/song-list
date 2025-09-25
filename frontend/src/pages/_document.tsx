import { Head, Html, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        >
        </link>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        >
        </link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
