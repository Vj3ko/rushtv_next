import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token')
  //if trying to visit user page without credentials, redirect to login page
  if (!session && request.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/register', request.url))
  }
}

export const config = {
  matcher: ['/user/:path*'],
}
