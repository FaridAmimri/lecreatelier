/** @format */

'use client'

import Link from 'next/link'
import styles from '../../styles/Login.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { Oval } from 'react-loader-spinner'

function Login() {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setError(params.get('error'))
    setSuccess(params.get('success'))
    if (session.status === 'authenticated') {
      router?.push('/')
    }
  }, [params, router, session.status])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const email = e.target[0].value
    const password = e.target[1].value

    signIn('credentials', {
      email,
      password
    })
  }

  return (
    <div className={styles.authentication}>
      <h1>Se connecter</h1>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' placeholder='Email' name='email' required />
        <input
          type='password'
          placeholder='Mot de passe'
          name='password'
          required
        />
        <div className={styles.loginBtn}>
          <button disabled={isLoading}>Connexion</button>
        </div>
        {error && <span className={styles.error}>Compte email inexistant</span>}
        <div className={styles.googleBtn}>
          <button disabled={isLoading} onClick={() => signIn('google')}>
            <FcGoogle />
            Google
          </button>
        </div>
        {isLoading && (
          <div className={styles.spinner}>
            <Oval
              height={40}
              width={40}
              color='teal'
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor='#b9e7e7'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        <span>
          Première visite ? <Link href='/register'>Sʼenregistrer</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
