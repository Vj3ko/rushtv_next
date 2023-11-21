import bcrypt from 'bcryptjs'
import { connectDB } from 'lib/mongo'
import User from 'lib/mongo/models'
import { NextResponse } from 'next/server'

//REGISTER
export async function POST(request: Request) {
  const { name, password, email } = await request.json()

  console.log(name, password, email)

  try {
    //connect to mongoDB database
    await connectDB()

    //check if user is already registered
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }

    const encryptedPass = await bcrypt.hash(password, 10)

    const newUser = new User({ name, password: encryptedPass, email })
    await newUser.save()

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error while trying to register' },
      { status: 500 },
    )
  }
}
