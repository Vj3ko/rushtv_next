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

    const favoriteMovie = await prisma.favoriteMovies.findFirst({
      where: {
        userId: user?.id,
        movieId: params.id,
      },
    })

    return NextResponse.json({ isSaved: !!favoriteMovie }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error trying to get favorite movie' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, title, img } = await req.json()
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

    const movieAlreadySaved = await prisma.favoriteMovies.findFirst({
      where: {
        userId: user?.id,
        movieId: id,
      },
    })

    //if movie is saved to favorites, then delete it
    if (movieAlreadySaved) {
      await prisma.favoriteMovies.deleteMany({
        where: {
          userId: user?.id,
          movieId: id,
        },
      })

      return NextResponse.json(
        { message: 'Removed from favorites' },
        { status: 200 },
      )
    }

    //if its not saved to favorites,then save it
    await prisma.favoriteMovies.create({
      data: {
        userId: user?.id,
        movieId: id,
        movieTitle: title,
        movieImg: img,
      },
    })

    return NextResponse.json({ message: 'Saved to favorites' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error trying to save favorite movie' },
      { status: 500 },
    )
  }
}
