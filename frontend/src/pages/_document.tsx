import { Head, Html, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
      <Head>
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
