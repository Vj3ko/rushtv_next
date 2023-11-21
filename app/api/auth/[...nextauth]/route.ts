import bcrypt from 'bcryptjs'
import { connectDB } from 'lib/mongo'
import User from 'lib/mongo/models'
import NextAuth, { SessionStrategy } from 'next-auth'
import CredentialsProvider, {
  CredentialsConfig,
} from 'next-auth/providers/credentials'

interface AuthOptions {
  providers: CredentialsConfig<{}>[]
  callbacks: {}
  session: {
    strategy: SessionStrategy
  }
  secret: string | undefined
  pages: {}
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      authorize: async (credentials: any) => {
        const { name, password } = credentials

        try {
          await connectDB()
          const user = await User.findOne({ name })

          if (!user) return null

          const isPassMatching = await bcrypt.compare(password, user.password)
          if (!isPassMatching) return null

          return user
        } catch (error) {
          console.error('Error during authorization: ', error)
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      if (session) {
        const sessionUser = await User.findOne({ name: session.user.name })
        session.user.id = sessionUser._id.toString()
        return session
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/register',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
