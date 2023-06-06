/** @format */

'use client'

import Image from 'next/image'
import styles from '@/styles/Single.module.scss'
import Edit from '@/public/icons/edit.png'
import Delete from '@/public/icons/delete.png'
import Link from 'next/link'
import Menu from '@components/Menu'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { publicRequest } from '@utils/requests'
import { useRouter } from 'next/navigation'
import moment from 'moment/moment'
import SingleSkeleton from '@components/SingleSkeleton'

function Single() {
  const [post, setPost] = useState([])
  const [isloading, setIsLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const postId = pathname.split('/')[2]

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await publicRequest.get(`post/${postId}`)
        setPost(res.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    if (postId) fetchPost()
  }, [postId])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  const handleDelete = async () => {
    try {
      await publicRequest.delete(`post/${postId}`)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isloading ? (
        <SingleSkeleton styles={styles} posts={1} />
      ) : (
        <div className={styles.single}>
          <div className={styles.content}>
            <div className={styles.illustration}>
              {post.image && (
                <Image
                  src={post.image}
                  priority
                  alt='illustration du post'
                  width={700}
                  height={300}
                />
              )}
            </div>

            <div className={styles.user}>
              {post.profil && (
                <Image
                  src={post.profil}
                  alt='image profile'
                  width={50}
                  height={50}
                />
              )}
              <div className={styles.info}>
                <span>{post.username}</span>
                <p>Posted {moment(post.createdAt).fromNow()}</p>
              </div>
              <div className={styles.edit}>
                <Link href={{ pathname: '/write', query: post }}>
                  <Image
                    src={Edit}
                    alt='boutton modifié'
                    width={20}
                    height={20}
                  />
                </Link>
                <Image
                  src={Delete}
                  alt='boutton supprimé'
                  width={20}
                  height={20}
                  onClick={handleDelete}
                />
              </div>
            </div>

            <div className={styles.message}>
              <h1>{post.title}</h1>
              <article>
                <p>{getText(post.description)}</p>
              </article>
            </div>
          </div>

          <div className={styles.menu}>
            <Menu styles={styles} category={post.category} />
          </div>
        </div>
      )}
    </>
  )
}

export default Single
