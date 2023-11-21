import Link from 'next/link'
import styles from './Button.module.scss'

interface ButtonType {
  link: string
  text: string
}

export const Button = ({ link, text }: ButtonType) => {
  return (
    <>
      {link && (
        <Link href={link} target='_blank' className={styles.link}>
          {text}
        </Link>
      )}
    </>
  )
}
