'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import styles from './AuthenticationForm.module.scss'
import FormData from './formData/FormData'

export type LoginOrRegister = 'login' | 'register'
export type FormDataType = {
  name: string
  password: string
  email?: string
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
      const response = await fetch('/api/register', {
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
      }
    } catch (error) {
      toast.error('Error trying to register')
    }
  }

  const handleLogin = async (data: FormDataType) => {
    const { name, password } = data

    try {
      const response = await signIn('credentials', {
        name,
        password,
        redirect: false,
      })

      if (response && response.error) {
        toast.error('Invalid credentials')
        return
      }

      router.refresh()
    } catch (error) {
      console.error('Error trying to login', error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
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
