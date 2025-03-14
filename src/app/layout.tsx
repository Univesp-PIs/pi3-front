import { Roboto } from 'next/font/google'
import './globals.css'

import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

import { Toaster } from 'react-hot-toast'
import { NetworkStatusNotifier } from '@/utils/networkStatusNotifier'
import { ProviderQueryClient } from '@/contexts/QueriesContext'
import { AuthProvider } from '@/contexts/AuthContex'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} antialiased`}
        suppressHydrationWarning
      >
        <NetworkStatusNotifier />
        <Toaster position="bottom-right" reverseOrder={false} />
        <ProviderQueryClient>
          <AuthProvider>{children}</AuthProvider>
        </ProviderQueryClient>
      </body>
    </html>
  )
}
