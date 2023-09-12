import '@/styles/globals.css'
import 'regenerator-runtime'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
