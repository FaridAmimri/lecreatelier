/** @format */

import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Menu = ({ styles, category }) => {
  const [posts, setposts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/post?category=${category}`)
        setposts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [category])

  return (
    <>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          {post.image && (
            <Image src={post.image} alt='' width={280} height={200} />
          )}
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </>
  )
}

export default Menu
