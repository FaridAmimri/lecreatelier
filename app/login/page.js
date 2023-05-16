/** @format */

import Link from 'next/link'
import styles from '../../styles/Login.module.scss'

function Login() {
  return (
    <div className={styles.authentication}>
      <h1>Se connecter</h1>
      <form action=''>
        <input type='text' placeholder="Nom d'utilisateur" />
        <input type='password' placeholder='Mot de passe' />
        <button>Connexion</button>
        <p>Email ou mot de passe incorrect</p>
        <span>
          Première visite ? <Link href='/register'>S&apos;enregistrer</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
