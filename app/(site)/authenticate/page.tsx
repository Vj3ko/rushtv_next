import AnimatedComponent from 'animations/AnimatedComponent'
import { AuthenticationForm } from 'app/components/ui'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from 'routes/authOptions'

const AuthenticatePage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/user')
  }

  return (
    <AnimatedComponent>
      <div className='container'>
        <AuthenticationForm />
      </div>
    </AnimatedComponent>
  )
}

export default AuthenticatePage
