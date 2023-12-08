import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'app/libs/prismadb'
import bcrypt from 'bcryptjs'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        /* eslint-disable-next-line*/
        // @ts-ignore
        const { email, password } = credentials

        try {
          const user = await prisma.user.findUnique({ where: { email } })

          if (!user || !user.password) {
            throw new Error('No user with this email')
          }

          const isPassMatching = await bcrypt.compare(password, user.password)
          if (!isPassMatching) {
            throw new Error('Incorrect password')
          }

          return user
        } catch (error) {
          console.error('Error during authorization: ', error)
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/authenticate',
  },
  debug: process.env.NODE_ENV === 'development',
}
