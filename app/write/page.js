/** @format */

import styles from '../../styles/Write.module.scss'
import Editor from '@/components/Editor'

function Write() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input type='text' placeholder='Title'></input>
        <div className={styles.editor}>
          <Editor />
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
            style={{ display: 'none' }}
          />
          <label htmlFor='file' className={styles.file}>
            Upload Image
          </label>
          <div className={styles.buttons}>
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>

        <div className={styles.item}>
          <h1>Category</h1>
          <div className={styles.category}>
            <input type='radio' name='category' value='art' id='art'></input>
            <label htmlFor='art'>Art</label>
          </div>
          <div className={styles.category}>
            <input
              type='radio'
              name='category'
              value='science'
              id='science'
            ></input>
            <label htmlFor='science'>Science</label>
          </div>
          <div className={styles.category}>
            <input
              type='radio'
              name='category'
              value='technology'
              id='technology'
            ></input>
            <label htmlFor='art'>Technology</label>
          </div>
          <div className={styles.category}>
            <input
              type='radio'
              name='category'
              value='cinema'
              id='cinema'
            ></input>
            <label htmlFor='art'>Cinema</label>
          </div>
          <div className={styles.category}>
            <input
              type='radio'
              name='category'
              value='design'
              id='design'
            ></input>
            <label htmlFor='art'>Design</label>
          </div>
          <div className={styles.category}>
            <input type='radio' name='category' value='food' id='food'></input>
            <label htmlFor='art'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
