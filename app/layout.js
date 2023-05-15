/** @format */

import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Le Créatelier',
  description: 'Blog '
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
