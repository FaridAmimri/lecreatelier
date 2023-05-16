/** @format */

import styles from '../styles/Footer.module.scss'
import Image from 'next/image'
import Logo from '../public/images/logo.png'
import { FaHeart } from 'react-icons/fa'

function Footer() {
  return (
    <div className={styles.footer}>
      <footer>
        <Image src={Logo} alt='logo le créatelier' priority height={50}></Image>
        <span>
          Made with <FaHeart className={styles.heartIcon} /> by{' '}
          <b>FariDigital</b>
        </span>
      </footer>
    </div>
  )
}

export default Footer
