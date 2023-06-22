/** @format */

import { connectToDB } from '@utils/database'
import Post from '@models/post'

export const GET = async (req, res) => {
  const queryCategory = req.nextUrl.searchParams.get('category')

  try {
    await connectToDB()

    let posts
    if (queryCategory) {
      posts = await Post.find({
        category: queryCategory
      }).populate('creator')
    } else {
      posts = await Post.find({})
    }

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch posts', { status: 500 })
  }
}
