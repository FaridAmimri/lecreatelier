/** @format */

import { connectToDB } from '@utils/database'
import Post from '@models/post'

export const POST = async (req) => {
  const { userId, avatar, name, title, description, image, category } =
    await req.json()
  // Extract all data that we pass threw the post request

  try {
    await connectToDB() // We have to do this every time
    const newPost = new Post({
      creator: userId,
      profil: avatar,
      username: name,
      title,
      description,
      image,
      category
    })

    await newPost.save()
    return new Response(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new post', { status: 500 })
  }
}
