/** @format */
'use client'

import { useState, useEffect } from 'react'
import styles from '@styles/Write.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Input from '@components/Input'
import { useSession } from 'next-auth/react'
import { publicRequest } from '@utils/requests'
import { useSearchParams } from 'next/navigation'

function Write() {
  const searchParams = useSearchParams()

  const titlePost = searchParams.get('title')
  const titleDesc = searchParams.get('description')
  const titleCat = searchParams.get('category')

  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)

  const [title, setTitle] = useState(titlePost || '')
  const [description, setDescription] = useState(titleDesc || '')
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState(titleCat || '')

  const handlePost = async (e) => {
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

      const response = await publicRequest.post('post/new', newPost)
      response.status === 201 && router.push('/')
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div className={styles.editor}>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            style={{ height: '100%', border: 'none' }}
          />
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.item}>
          <h1>Publier</h1>
          <span>
            <b>Statut: </b>Brouillon
          </span>
          <span>
            <b>Visibilité: </b>Public
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
            <button>Annuler</button>
            <button disabled={submitting} onClick={handlePost}>
              Publier
            </button>
          </div>
        </div>

        <div className={styles.item}>
          <h1>Categorie</h1>
          <Input
            styles={styles.category}
            category='art'
            label='Art'
            checked={category === 'art'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='science'
            label='Science'
            checked={category === 'science'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='technology'
            label='Technology'
            checked={category === 'technology'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='cinema'
            label='Cinema'
            checked={category === 'cinema'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='design'
            label='Design'
            checked={category === 'design'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='food'
            label='Food'
            checked={category === 'food'}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Write
