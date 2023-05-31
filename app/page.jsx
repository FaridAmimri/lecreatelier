/** @format */
'use client'

import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { publicRequest } from '@utils/requests'
import HomeSkeleton from '@components/HomeSkeleton'

function Home() {
  const [posts, setPosts] = useState([])
  const [isloading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await publicRequest.get(
          category ? `post?category=${category}` : 'post'
        )
        setPosts(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [category])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <div className={styles.posts}>
          {isloading && <HomeSkeleton styles={styles} posts={4} />}
          {posts.map((post) => (
            <div className={styles.post} key={post._id}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={post.image}
                  alt='description'
                  priority
                  width={340}
                  height={400}
                ></Image>
              </div>
              <div className={styles.content}>
                <h1>{post.title}</h1>
                <p>{getText(post.description.slice(0, 300))}...</p>
                <Link href={`/post/${post._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
