'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { useState } from 'react'
import { toast } from 'react-toastify'
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

    if (!email || !password) {
      if (type === 'register' && !name) {
        toast.error('Please fill out all the input fields')
        return
      }
      toast.error('Please fill out all the input fields')
      return
    }

    type === 'login'
      ? handleLogin({ email, password })
      : handleRegister({ name, password, email })
  }

  return (
    <AnimatedComponent>
      <div className={styles.form__container}>
        <h2>{type}</h2>

        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <div className={styles.user__box}>
              <input
                type='text'
                value={name}
                name=''
                onChange={e => setName(e.target.value)}
                autoFocus
              />
              <label>name</label>
            </div>
          )}

          <div className={styles.user__box}>
            <input
              type='email'
              value={email}
              name=''
              onChange={e => setEmail(e.target.value)}
              autoFocus={type === 'login'}
            />
            <label>email</label>
          </div>

          <div className={styles.user__box}>
            <input
              value={password}
              type='password'
              name=''
              onChange={e => setPassword(e.target.value)}
            />
            <label>password</label>
          </div>
          <p>
            {type === 'login'
              ? 'Dont have an account yet? Click'
              : 'Already have an account? Click'}{' '}
            <span onClick={changeForm} className={styles.toggler}>
              here
            </span>{' '}
            {type === 'login' ? 'to register' : 'to login'}
          </p>

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
