/** @format */

'use client'

import Link from 'next/link'
import styles from '../../styles/Login.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

function Login() {
  const [values, setValues] = useState([])
  const [error, setError] = useState(null)

  const session = useSession()
  const router = useRouter()

  if (session.status === 'authenticated') {
    router.push('/')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email: values.email,
      password: values.password
    }

    signIn('credentials', user)
  }

  return (
    <div className={styles.authentication}>
      <h1>Se connecter</h1>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          name='email'
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          name='password'
          onChange={handleInputChange}
        />
        <div className={styles.loginBtn}>
          <button>Connexion</button>
        </div>
        <div className={styles.googleBtn}>
          <button onClick={() => signIn('google')}>
            <FcGoogle />
            Google
          </button>
        </div>
        {error && <p>Email ou mot de passe incorrect</p>}
        <span>
          Première visite ? <Link href='/register'>Sʼenregistrer</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
