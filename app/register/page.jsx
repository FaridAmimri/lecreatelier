/** @format */
'use client'

import Link from 'next/link'
import styles from '../../styles/Register.module.scss'
import { useState } from 'react'
import { publicRequest } from '@utils/requests'
import { useRouter } from 'next/navigation'

function Register() {
  const [values, setValues] = useState([])
  const [error, setError] = useState(null)

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password
      }

      const response = await publicRequest.post('auth/register', newUser)

      response.status === 201 &&
        router.push('/login?success=Account has been created')
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <div className={styles.authentication}>
      <h1>Pas encore inscrit ?</h1>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="Nom d'utilisateur"
          name='username'
          onChange={handleInputChange}
        />
        <input
          type='email'
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
        <button>Sʼenregistrer</button>
        {error && <p>Cet email est déjà rattaché à un compte</p>}
        <span>
          Déjà inscrit ? <Link href='/login'>Se connecter</Link>
        </span>
      </form>
    </div>
  )
}

export default Register
