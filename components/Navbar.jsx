/** @format */
'use client'

import styles from 'styles/Navbar.module.scss'
import Logo from '../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data, status } = useSession()

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href='/'>
          <Image src={Logo} alt='logo le créatelier' priority width={120} />
        </Link>
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

        {status === 'authenticated' && (
          <>
            {data?.user.name && (
              <span className={styles.user}>{data.user.name}</span>
            )}

            <span className={styles.logout} onClick={signOut}>
              Logout
            </span>

            <span className={styles.write}>
              <Link className={styles.link} href='/write'>
                Écrire
              </Link>
            </span>
          </>
        )}
        {status === 'unauthenticated' && (
          <span className={styles.login}>
            <Link href='/login'>Login </Link>
          </span>
        )}
      </div>
    </div>
  )
}

export default Navbar
