import { prisma } from 'app/libs/prismadb'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from 'routes/authOptions'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    const movies = await prisma.favoriteMovies.findMany({
      where: {
        userId: user?.id,
      },
    })

    if (!movies) {
      return NextResponse.json(
        { message: 'You have no favorite movies...' },
        { status: 404 },
      )
    }

    return NextResponse.json(movies)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error trying to get favorite movies' },
      { status: 500 },
    )
  }
}
