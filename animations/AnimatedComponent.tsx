'use client'

import { motion } from 'framer-motion'
import { pageVariant } from './variants'

const AnimatedComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={pageVariant}
      initial='hidden'
      animate='visible'
      exit='exit'>
      {children}
    </motion.div>
  )
}

export default AnimatedComponent
