import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  const isAuthPage = router.pathname.startsWith('/auth')

  return (
    <SessionProvider session={session}>
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? 'pt-16' : ''}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
