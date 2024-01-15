'use client'

import { hasCookie, setCookie } from 'cookies-next'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import styles from './CookiesContainer.module.scss'

const ONE_MONTH = 60 * 60 * 24 * 30

const CookiesContainer = () => {
  const [showConsent, setShowConsent] = useState(true)

  useEffect(() => {
    setShowConsent(hasCookie('localConsent'))
  }, [])

  const acceptCookie = () => {
    setShowConsent(true)
    setCookie('localConsent', 'true', {
      maxAge: ONE_MONTH,
    })
  }

  if (showConsent) {
    return null
  }

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 2, duration: 0.3 } }}
      className={styles.cookies}>
      <span>
        This website uses cookies to improve user experience. By using our
        website you consent to all cookies in accordance with our{' '}
        <a href='#'>Cookie Policy</a>.
      </span>
      <div className={styles.btns}>
        <button onClick={acceptCookie}>Accept</button>
        <button onClick={acceptCookie}>Accept essentials</button>
      </div>
    </motion.div>
  )
}

export default CookiesContainer
