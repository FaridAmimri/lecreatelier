/** @format */

import { connectToDB } from '@utils/database'
import Post from '@models/post'

// GET (read) A POST
export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const post = await Post.findById(params.id).populate('creator')
    if (!post) return new Response('Post not found', { status: 404 })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch post', { status: 500 })
  }
}

// UPDATE A POST
export const PATCH = async (req, { params }) => {
  const { title, description, image, category } = await req.json()

  try {
    await connectToDB()

    // Find the existing post by ID
    const existingPost = await Post.findById(params.id)

    if (!existingPost) {
      return new Response('Post not found', { status: 404 })
    }

    // Update the post with new data
    existingPost.title = title
    existingPost.description = description
    existingPost.image = image
    existingPost.category = category

    await existingPost.save()

    return new Response('Successfully updated the post', { status: 200 })
  } catch (error) {
    return new Response('Error updating post', { status: 500 })
  }
}

// DELETE A POST
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    // Find the post by ID and remove it
    await Post.findByIdAndRemove(params.id)

    return new Response('Post deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Error deleting post', { status: 500 })
  }
}
