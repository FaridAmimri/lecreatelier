/** @format */

import { Schema, models, model } from 'mongoose'

const PostSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    profil: {
      type: String
    },
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    image: {
      type: String,
      required: [true, 'File is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    }
  },
  { timestamps: true }
)

const Post = models.Post || model('Post', PostSchema)

export default Post
