import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TanstackProvider from './components/providers/TanstackProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Todo app with tailwind and nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>

  )
}
