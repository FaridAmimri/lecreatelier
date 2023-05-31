/** @format */

import { connectToDB } from '@utils/database'
import Post from '@models/post'

// GET (read)
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

// DELETE
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
