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

    const people = await prisma.favoritePeople.findMany({
      where: {
        userId: user?.id,
      },
    })

    if (!people) {
      return NextResponse.json(
        { message: 'You have no favorite people...' },
        { status: 404 },
      )
    }

    return NextResponse.json(people)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error trying to get favorite people' },
      { status: 500 },
    )
  }
}
