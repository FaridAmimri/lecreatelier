/** @format */

import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required!']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!']
  },
  password: {
    type: String,
    unique: true
  },
  image: {
    type: String
  }
})

const User = models.User || model('User', UserSchema)
// First look in models to check if User exists. If not create a new model

export default User
