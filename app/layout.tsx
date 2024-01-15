import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.scss'
import CookiesContainer from './components/cookiesContainer/CookiesContainer'
import { MemoizedFooter } from './components/footer/Footer'
import { MemoizedNavigation } from './components/header/Header'
import AuthProvider from './providers'

export const metadata: Metadata = {
  title: 'Rush TV',
  description: 'Entertainment platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <MemoizedNavigation />
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            draggable={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
          <main style={{ minHeight: '50vh' }}>{children}</main>
          <MemoizedFooter />
        </AuthProvider>
        <SpeedInsights />

        <CookiesContainer />
      </body>
    </html>
  )
}
