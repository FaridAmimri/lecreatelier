/** @format */

import React from 'react'

const Input = ({ styles, checked, category, label, onChange }) => {
  return (
    <div className={styles}>
      <input
        type='radio'
        name='category'
        checked={checked}
        id={category}
        onChange={onChange}
      ></input>
      <label htmlFor={category}>{label}</label>
    </div>
  )
}

export default Input
