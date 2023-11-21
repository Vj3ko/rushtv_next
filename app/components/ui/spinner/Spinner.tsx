import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import styles from './Spinner.module.scss'

const SpinnerComponent = () => {
  let color = '#5468ff'

  return (
    <div className={styles.spinner}>
      <ClipLoader
        color={color}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export const Spinner = React.memo(SpinnerComponent)
