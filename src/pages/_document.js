import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="BocchiTalk" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" sizes="192x192" href="../../public/512x512_Bocchi-Talk.png" />
        <link rel="icon" href="../../public/favicon.ico" />
        <link rel="manifest" href="../../public/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
