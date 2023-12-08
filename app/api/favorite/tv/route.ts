import { authOptions } from 'api/authOptions'
import { prisma } from 'app/libs/prismadb'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    const favoriteShows = await prisma.favoriteTvShows.findMany({
      where: {
        userId: user?.id,
      },
    })

    if (!favoriteShows) {
      return NextResponse.json(
        { message: 'You have no favorite tv shows...' },
        { status: 404 },
      )
    }

    return NextResponse.json(favoriteShows)
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error trying to get favorite tv shows' },
      { status: 500 },
    )
  }
}
