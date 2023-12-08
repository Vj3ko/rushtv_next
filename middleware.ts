import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  //if user tries to manually query the authentication page, redirect to user page
  if (session && req.nextUrl.pathname.startsWith('/authenticate')) {
    return NextResponse.redirect(new URL('/user', req.url))
  }

  //if user tries to manually query the user page, redirect to authentication page
  if (!session && req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/authenticate', req.url))
  }
}
