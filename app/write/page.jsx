/** @format */
'use client'

import { useState } from 'react'
import styles from '@styles/Write.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Input from '@components/Input'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function Write() {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  const [category, setCategory] = useState('')

  const CreatePost = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'lecreatelier')

    try {
      const upload = await axios.post(
        'https://api.cloudinary.com/v1_1/dwnmbt2d0/image/upload',
        formData
      )

      const { url } = upload.data
      const newPost = {
        userId: session?.user.id,
        avatar: session?.user.image,
        name: session?.user.name,
        title: title,
        description: description,
        image: url,
        category: category
      }

      const response = await axios.post('/api/post/new', newPost)
      console.log('ok')
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input
          type='text'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div className={styles.editor}>
          <ReactQuill
            theme='snow'
            onChange={setDescription}
            style={{ height: '100%', border: 'none' }}
          />
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.item}>
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            type='file'
            name='file'
            id='file'
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <label htmlFor='file' className={styles.file}>
            Upload Image
          </label>
          <div className={styles.buttons}>
            <button>Save as a draft</button>
            <button disabled={submitting} onClick={CreatePost}>
              Publish
            </button>
          </div>
        </div>

        <div className={styles.item}>
          <h1>Category</h1>
          <Input
            styles={styles.category}
            category='art'
            label='Art'
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='science'
            label='Science'
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='technology'
            label='Technology'
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='cinema'
            label='Cinema'
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='design'
            label='Design'
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='food'
            label='Food'
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Write
