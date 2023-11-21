'use client'

import { overviewBtnVariant, overviewVariant } from 'animations/variants'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import styles from './OverviewText.module.scss'

interface Text {
  text: string
  type?: string
}

export const OverviewText = ({ text, type }: Text) => {
  const [active, setActive] = useState(false)

  return (
    <div className={`${styles.overview} ${type === 'person' && styles.person}`}>
      <AnimatePresence mode='wait'>
        <motion.p
          key={active ? 'active' : 'inactive'}
          className={`${!active && styles.read__more}`}
          variants={overviewVariant}
          initial='shrink'
          animate='grow'
          exit='shrink'>
          {' '}
          {text}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <motion.button
          key={active ? 'active' : 'inactive'}
          variants={overviewBtnVariant}
          initial='hide'
          animate='show'
          exit='exit'
          className={styles.overview__cta}
          onClick={() => setActive(prev => !prev)}>
          {active ? 'Read Less' : 'Read More'}
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
