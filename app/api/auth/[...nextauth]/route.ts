import NextAuth from 'next-auth'
import { authOptions } from 'routes/authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
