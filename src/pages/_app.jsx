import '@/styles/globals.css'
import 'regenerator-runtime'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { LoadingProvider } from '@/hooks/useLoading'
import { RecoilRoot } from 'recoil'
import { GetCurrentUser } from '@/components/get-current-user'
import { customTheme } from '@/styles/ChakraTheme'

import Script from 'next/script'
import * as gtag from '@/lib/gtag'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <RecoilRoot>
        <SessionProvider>
          <ChakraProvider theme={customTheme}>
            <LoadingProvider>
              <Component {...pageProps} />
              <GetCurrentUser />
            </LoadingProvider>
          </ChakraProvider>
        </SessionProvider>
      </RecoilRoot>
    </>
  )
}
