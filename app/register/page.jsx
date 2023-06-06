/** @format */
'use client'

import Link from 'next/link'
import styles from '../../styles/Register.module.scss'
import { useState } from 'react'
import { publicRequest } from '@utils/requests'
import { useRouter } from 'next/navigation'
import { Oval } from 'react-loader-spinner'

function Register() {
  const [values, setValues] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const validate = () => {
    let temp = {}
    const regexEmail = /\S+@\S+\.\S+/

    temp.username = values.username ? '' : 'Entrer votre nom et prénom'
    temp.email = regexEmail.test(values.email) ? '' : 'Entrer un email correct'
    temp.password = values.password ? '' : 'Entrer un mot de passe'
    setErrors({ ...temp })
    return Object.values(temp).every((x) => x === '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (validate()) {
        setError(false)

        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password
        }

        const response = await publicRequest.post('auth/register', newUser)

        response.status === 201 &&
          router.push('/login?success=Account has been created')
      }
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authentication}>
      <h1>Pas encore inscrit ?</h1>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nom Prénom'
          name='username'
          onChange={handleInputChange}
        />
        {errors.username && (
          <span className={styles.errors}>{errors.username}</span>
        )}
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleInputChange}
        />
        {errors.email && <span className={styles.errors}>{errors.email}</span>}
        <input
          type='password'
          placeholder='Mot de passe'
          name='password'
          onChange={handleInputChange}
        />
        {errors.password && (
          <span className={styles.errors}>{errors.password}</span>
        )}
        <button disabled={isLoading}>Sʼenregistrer</button>
        {error && <p>Cet email est déjà rattaché à un compte</p>}

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
          Déjà inscrit ? <Link href='/login'>Se connecter</Link>
        </span>
      </form>
    </div>
  )
}

export default Register
