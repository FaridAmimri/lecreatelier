/** @format */

import styles from '../styles/Navbar.module.scss'
import Image from 'next/image'
import Logo from '../public/images/logo.png'
import Link from 'next/link'

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src={Logo} alt='logo le créatelier' priority width={120} />
        </div>
        <div className={styles.links}>
          <Link className={styles.link} href='/?category=art'>
            <h6>ART</h6>
          </Link>
          <Link className={styles.link} href='/?category=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className={styles.link} href='/?category=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className={styles.link} href='/?category=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className={styles.link} href='/?category=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className={styles.link} href='/?category=food'>
            <h6>FOOD</h6>
          </Link>
          <span>Farid</span>
          <span>Logout</span>
          <span className={styles.write}>
            <Link className={styles.link} href='/write'>
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
