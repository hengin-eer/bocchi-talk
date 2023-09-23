import '@/styles/globals.css'
import 'regenerator-runtime'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { LoadingProvider } from '@/hooks/useLoading'
import { RecoilRoot } from 'recoil'
import { GetCurrentUser } from '@/components/get-current-user'

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider>
          <LoadingProvider>
            <Component {...pageProps} />
            <GetCurrentUser />
          </LoadingProvider>
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
  )
}
