/** @format */
'use client'

import styles from 'styles/Navbar.module.scss'
import Logo from '../public/assets/logo.png'
import { HiMenuAlt1 } from 'react-icons/hi'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

const Navbar = () => {
  const { data, status } = useSession()
  const [toggleBtn, setToggleBtn] = useState(false)

  const handleClick = () => {
    setToggleBtn((prev) => !prev)
  }

  return (
    <>
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

      <div className={styles.navbarMobile}>
        <div className={styles.logo}>
          <Link href='/' onClick={() => setToggleBtn(false)}>
            <Image src={Logo} alt='logo le créatelier' priority width={120} />
          </Link>
        </div>
        <div className={styles.toggleBtn} onClick={handleClick}>
          <HiMenuAlt1 />
        </div>
      </div>

      <div
        className={styles.menuLink}
        style={{ right: toggleBtn ? '0px' : '-50vw' }}
      >
        <div className={styles.links}>
          <Link
            className={styles.link}
            href='/?category=art'
            onClick={handleClick}
          >
            <h6>ART</h6>
          </Link>
          <Link
            className={styles.link}
            href='/?category=science'
            onClick={handleClick}
          >
            <h6>SCIENCE</h6>
          </Link>
          <Link
            className={styles.link}
            href='/?category=technology'
            onClick={handleClick}
          >
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link
            className={styles.link}
            href='/?category=cinema'
            onClick={handleClick}
          >
            <h6>CINEMA</h6>
          </Link>
          <Link
            className={styles.link}
            href='/?category=design'
            onClick={handleClick}
          >
            <h6>DESIGN</h6>
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
                <Link
                  className={styles.link}
                  href='/write'
                  onClick={handleClick}
                >
                  Écrire
                </Link>
              </span>
            </>
          )}
          {status === 'unauthenticated' && (
            <span className={styles.login}>
              <Link href='/login' onClick={() => setToggleBtn(false)}>
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
