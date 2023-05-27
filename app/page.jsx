/** @format */
'use client'

import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])

  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  console.log(category)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          category ? `/api/post?category=${category}` : '/api/post'
        )
        setPosts(response.data)
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
                <Link href={`/single/${post.Link}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.description)}</p>
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
