import AnimatedComponent from 'animations/AnimatedComponent'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'

const UserPage = async () => {
  const session = await getServerSession(authOptions)

  //   if (!session) {
  //     redirect('/register')
  //   }

  return (
    <AnimatedComponent>
      <div className='container'>
        <div className='list__section'>
          <h1>User: {session?.user?.name}</h1>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default UserPage
