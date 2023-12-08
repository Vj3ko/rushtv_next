'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './AuthenticationForm.module.scss'
import FormData from './formData/FormData'

export type LoginOrRegister = 'login' | 'register'
export type FormDataType = {
  name?: string
  password: string
  email: string
}

export const AuthenticationForm = () => {
  const [type, setType] = useState<LoginOrRegister>('login')
  const router = useRouter()

  const changeForm = (): void => {
    if (type === 'login') setType('register')
    if (type === 'register') setType('login')
  }

  const handleRegister = async (data: FormDataType) => {
    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const { message } = await response.json()

      if (!response.ok) {
        toast.error(message)
        return
      } else {
        toast.success(message)
        changeForm()
      }
    } catch (error) {
      toast.error('Error trying to register')
    }
  }

  const handleLogin = async (data: FormDataType) => {
    const { email, password } = data

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (response && response.error) {
        toast.error('Invalid credentials')
        return
      }

      router.push('/user')
    } catch (error) {
      console.error('Error trying to login', error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <FormData
        key={type}
        type={type}
        changeForm={changeForm}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </div>
  )
}
