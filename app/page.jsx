/** @format */

import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

const posts = [
  {
    id: 1,
    title: 'Le Créatelier ? Mais qu’est-ce que c’est ?',
    desc: 'Un lieu associatif de travail mais aussi de détente créative ouvert à toutes et tous. Ses activités sont centrées autour de la pratique Illustrative Artistique et Graphique.',
    img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Créer pour vivre',
    desc: 'On estime que 83% des métiers de 2050 n’existent pas encore. Dans un monde en constante évolution, les métiers de l’art, de la création et du design se diversifient et s’intensifient. Microentrepreneurs, indépendants, petits créateurs, bédéistes et étudiants...autant de profils en pleine expansion qui nécessitent un lieu de pratique, d’échange et de travail.',
    img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Créer pour s’évader',
    desc: 'L’avenir est aux esprits agiles ! Lacréativité et l’imaginaire s’unissent pouréveiller les enfants et émerveiller les adultes. Le créatelier a pour vocation de sortir du mythe selon lequel seul l’artiste talentueux à le droit de créer/dessiner et s’évader à travers la pratique manuelle. Le créatelier est un projet de démocratisation de la création: tout le monde peut s’amuser en art ! ',
    img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Créer pour s’inventer',
    desc: 'Si les vertus de l’Art-thérapie sont mondialement reconnues, ce n’est pas un hasard ! Non-contente d’être un domaine d’avenir, la création est un véritable outil de revalorisation personnelle, d’introspection et d’évolution. La fierté qui découle d’une création permet d’aller de l’avant, tandis que la découverte des différents processus créatifs aide à s’ouvrir au monde.',
    img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={post.img}
                  alt='description'
                  priority
                  width={340}
                  height={400}
                ></Image>
              </div>
              <div className={styles.content}>
                <Link href={`/single/${post.Link}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
