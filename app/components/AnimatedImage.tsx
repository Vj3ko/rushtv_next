'use client'

import { motion } from 'framer-motion'
import React from 'react'

const AnimatedImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      style={{ zIndex: -1 }}>
      {children}
    </motion.div>
  )
}

export default AnimatedImage
