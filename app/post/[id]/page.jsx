/** @format */

'use client'

import Image from 'next/image'
import styles from '@/styles/Single.module.scss'
import Edit from '@/public/icons/edit.png'
import Delete from '@/public/icons/delete.png'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'

const posts = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

function Single() {
  const [post, setPost] = useState([])

  const pathname = usePathname()
  const postId = pathname.split('/')[2]

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/post/${postId}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (postId) fetchPost()
  }, [postId])

  return (
    <div className={styles.single}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image
            src={post.file}
            alt='illustration du post'
            width={700}
            height={300}
          />
        </div>

        <div className={styles.user}>
          <Image src={post.file} alt='image profile' width={50} height={50} />
          <div className={styles.info}>
            <span>{post.username}</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className={styles.edit}>
            <Link href={`/write?edit=2`}>
              <Image src={Edit} alt='boutton modifié' width={20} height={20} />
            </Link>
            <Image src={Delete} alt='boutton supprimé' width={20} height={20} />
          </div>
        </div>

        <div className={styles.message}>
          <h1>{post.title}</h1>
          <article>
            <p>
              dangerouslySetInnerHTML=
              {{
                __html: DOMPurify.sanitize(post.description)
              }}
            </p>
          </article>
        </div>
      </div>

      <div className={styles.menu}>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <Image src={post.img} alt='' width={280} height={200} />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Single
