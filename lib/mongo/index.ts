import mongoose from 'mongoose'

let isConnected = false
const DB_CONNECTION: string | undefined = process.env.MONGODB_URI

export const connectDB = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('DB already connected')
    return
  }

  try {
    DB_CONNECTION &&
      (await mongoose.connect(DB_CONNECTION, {
        dbName: 'user',
      }))

    isConnected = true
  } catch (error) {
    console.log('Error connecting to DB, error: ' + error)
  }
}
