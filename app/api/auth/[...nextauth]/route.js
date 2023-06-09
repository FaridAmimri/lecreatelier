/** @format */

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDB } from '@utils/database'
import User from '@models/user'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      async authorize(credentials) {
        await connectToDB()

        try {
          const user = await User.findOne({
            email: credentials.email
          })

          if (user) {
            // check password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error('Wrong credentials')
            }
          } else {
            throw new Error('User not found!')
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id & username from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.name = sessionUser.username
      session.user.id = sessionUser._id.toString()
      session.user.image = sessionUser.image || ''

      return session
    }
    // async signIn({ account, profile, user, credentials }) {
    //   try {
    //     await connectToDB()

    //     // check if user already exists
    //     const userExists = await User.findOne({ email: profile.email })

    //     // if not, create a new document and save user in MongoDB
    //     if (!userExists) {
    //       await User.create({
    //         email: profile.email,
    //         username: profile.name.replace(' ', '').toLowerCase(),
    //         image: profile.picture
    //       })
    //     }

    //     return true
    //   } catch (error) {
    //     console.log('Error checking if user exists: ', error.message)
    //     return false
    //   }
    // }
  },
  pages: {
    error: '/login'
  }
})

export { handler as GET, handler as POST }
