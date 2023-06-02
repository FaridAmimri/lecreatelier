/** @format */
'use client'

import styles from 'styles/Navbar.module.scss'
import Logo from '../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

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

        {session?.user ? (
          <>
            {session.user.image && (
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt='profile'
              />
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
        ) : (
          <>
            <span className={styles.login}>
              <Link href='/login'>Login </Link>
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
