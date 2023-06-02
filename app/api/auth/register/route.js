/** @format */

import { connectToDB } from '@utils/database'
import User from '@models/user'
import bcrypt from 'bcryptjs'

export const POST = async (req) => {
  const { username, email, password } = await req.json()

  try {
    await connectToDB()

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()
    return new Response('User has been created', { status: 201 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
