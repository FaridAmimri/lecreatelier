/** @format */

import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Provider from '@/components/Provider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Le Créatelier',
  description: 'Blog '
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <main className={poppins.className}>
            <Navbar />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
