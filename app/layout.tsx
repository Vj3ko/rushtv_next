import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.scss'
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
          <main style={{ minHeight: '50vh' }}>{children}</main>
          <MemoizedFooter />
        </AuthProvider>
      </body>
    </html>
  )
}
