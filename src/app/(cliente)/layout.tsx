import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import 'react-vertical-timeline-component/style.min.css'

export const metadata: Metadata = {
  title: 'EngSol - Consulte seu pedido',
  description: 'Sistema EngSol para consulta de pedidos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
