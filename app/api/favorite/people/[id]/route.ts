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
    const favoritePerson = await prisma.favoritePeople.findFirst({
      where: {
        userId: user?.id,
        personId: params.id,
      },
    })

    return NextResponse.json({ isSaved: !!favoritePerson }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error trying to get favorite person' },
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

    const personAlreadySaved = await prisma.favoritePeople.findFirst({
      where: {
        userId: user?.id,
        personId: id,
      },
    })

    //if movie is saved to favorites, then delete it
    if (personAlreadySaved) {
      await prisma.favoritePeople.deleteMany({
        where: {
          userId: user?.id,
          personId: id,
        },
      })

      return NextResponse.json(
        { message: 'Removed from favorites' },
        { status: 200 },
      )
    }

    //if its not saved to favorites,then save it
    await prisma.favoritePeople.create({
      data: {
        userId: user?.id,
        personId: id,
        personTitle: title,
        personImg: img,
      },
    })

    return NextResponse.json({ message: 'Saved to favorites' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error trying to save favorite person' },
      { status: 500 },
    )
  }
}
