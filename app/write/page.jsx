/** @format */
'use client'

import { useState } from 'react'
import styles from '@styles/Write.module.scss'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import Input from '@components/Input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { publicRequest } from '@utils/requests'
import { useSearchParams } from 'next/navigation'
import { Oval } from 'react-loader-spinner'

function Write() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const postId = searchParams.get('_id')
  const postTitle = searchParams.get('title')
  const postDesc = searchParams.get('description')
  const postCat = searchParams.get('category')

  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState(postTitle || '')
  const [description, setDescription] = useState(postDesc || '')
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState(postCat || '')

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

      const updatePost = {
        title: title,
        description: description,
        image: url,
        category: category
      }

      postId
        ? await publicRequest.patch(`/post/${postId}`, updatePost)
        : await publicRequest.post('post/new', newPost)

      // response.status === 201 && router.push('/')
      router.push('/')
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
            <Link href='/'>
              <span>Annuler</span>
            </Link>
            <button disabled={submitting} onClick={handlePost}>
              Publier
            </button>
          </div>
          {submitting && (
            <div className={styles.spinner}>
              <Oval
                height={20}
                width={20}
                color='teal'
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#b9e7e7'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          )}
        </div>

        <div className={styles.item}>
          <h1>Categorie</h1>
          <Input
            styles={styles.category}
            category='art'
            label='Art'
            value='art'
            checked={category === 'art'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='science'
            label='Science'
            value='science'
            checked={category === 'science'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='technology'
            label='Technology'
            value='technology'
            checked={category === 'technology'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='cinema'
            label='Cinema'
            value='cinema'
            checked={category === 'cinema'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='design'
            label='Design'
            value='design'
            checked={category === 'design'}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            styles={styles.category}
            category='food'
            label='Food'
            value='food'
            checked={category === 'food'}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Write
