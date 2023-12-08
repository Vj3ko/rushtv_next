import { authOptions } from 'api/authOptions'
import { prisma } from 'app/libs/prismadb'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    const favoriteTvShow = await prisma.favoriteTvShows.findFirst({
      where: {
        userId: user?.id,
        tvId: params.id,
      },
    })

    return NextResponse.json({ isSaved: !!favoriteTvShow }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error trying to get favorite tv show' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { id, title, img } = await req.json()

  try {
    //check if user is authorized for this action
    const session = await getServerSession(authOptions)

    //if user is not authorized, reject request to save to favorites
    if (!session) {
      return NextResponse.json(
        {
          message: 'You need to sign in to be able to save to favorites',
        },
        { status: 401 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    const tvShowAlreadySaved = await prisma.favoriteTvShows.findFirst({
      where: {
        userId: user?.id,
        tvId: id,
      },
    })

    //if tv show is saved to favorites, then delete it
    if (tvShowAlreadySaved) {
      await prisma.favoriteTvShows.deleteMany({
        where: {
          userId: user?.id,
          tvId: id,
        },
      })

      return NextResponse.json(
        { message: 'Removed from favorites' },
        { status: 200 },
      )
    }

    //if its not saved to favorites,then save it
    await prisma.favoriteTvShows.create({
      data: {
        userId: user?.id,
        tvId: id,
        tvTitle: title,
        tvImg: img,
      },
    })

    return NextResponse.json({ message: 'Saved to favorites' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error trying to save favorite tv show' },
      { status: 500 },
    )
  }
}
