import { prisma } from 'app/libs/prismadb'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

//REGISTER
export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  try {
    //check if user is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }

    const encryptedPass = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: { name, password: encryptedPass, email },
    })

    return NextResponse.json(
      { message: 'Successfully registered' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error while trying to register' },
      { status: 500 },
    )
  }
}
