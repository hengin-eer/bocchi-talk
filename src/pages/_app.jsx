import '@/styles/globals.css'
import 'regenerator-runtime'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { LoadingProvider } from '@/hooks/useLoading'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
