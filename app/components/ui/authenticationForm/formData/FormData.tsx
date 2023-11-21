'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FormDataType, LoginOrRegister } from '../AuthenticationForm'
import styles from './FormData.module.scss'

const FormData = ({
  type,
  changeForm,
  handleLogin,
  handleRegister,
}: {
  type: LoginOrRegister
  changeForm: () => void
  handleLogin: (data: FormDataType) => void
  handleRegister: (data: FormDataType) => void
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const validatedPassword = (pass: string): boolean => {
    if (pass.length < 8) {
      toast.error('Password needs at least 8 characters')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validate if the password has over 8 characters
    if (!validatedPassword(password)) return

    if (type === 'login') {
      if (!name || !password) {
        toast.error('Please fill out all the input fields')
        return
      }

      handleLogin({ name, password })
    }
    if (type === 'register') {
      if (!name || !password || !email) {
        toast.error('Please fill out all the input fields')
        return
      }

      handleRegister({ name, password, email })
    }
  }

  return (
    <AnimatedComponent>
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
      <div className={styles.form__container}>
        <h2>{type}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.user__box}>
            <input
              type='text'
              value={name}
              name=''
              onChange={e => setName(e.target.value)}
            />
            <label>name</label>
          </div>

          {type === 'register' && (
            <div className={styles.user__box}>
              <input
                type='email'
                value={email}
                name=''
                onChange={e => setEmail(e.target.value)}
              />
              <label>email</label>
            </div>
          )}

          <div className={styles.user__box}>
            <input
              value={password}
              type='password'
              name=''
              onChange={e => setPassword(e.target.value)}
            />
            <label>password</label>
          </div>
          {type === 'login' ? (
            <p>
              Dont have an account yet? click{' '}
              <span onClick={changeForm} className={styles.toggler}>
                here
              </span>{' '}
              to register
            </p>
          ) : (
            <p>
              Already registered? click{' '}
              <span onClick={changeForm} className={styles.toggler}>
                here
              </span>{' '}
              to login
            </p>
          )}

          <button type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {type}
          </button>
        </form>
      </div>
    </AnimatedComponent>
  )
}

export default FormData
