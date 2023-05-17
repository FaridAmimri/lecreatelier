/** @format */
'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'

function Editor() {
  const [value, setValue] = useState('')

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={setValue}
      style={{ height: '100%', border: 'none' }}
    />
  )
}

export default Editor
