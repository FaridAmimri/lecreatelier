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
