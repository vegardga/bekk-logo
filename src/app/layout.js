import { Inter } from 'next/font/google'
import './globals.css'
import './font.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bekk - Logo',
  description: 'Generate and animate words from Bekk logo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


