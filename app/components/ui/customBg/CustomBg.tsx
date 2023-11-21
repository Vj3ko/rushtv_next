import { IMG_URL } from 'constants/index'
import Image from 'next/image'
import styles from './CustomBg.module.scss'

interface CustomBgType {
  size: string
  link: string
}

export const CustomBg = async ({ size, link }: CustomBgType) => {
  return (
    <div className={styles.img__wrapper}>
      <Image
        src={`${IMG_URL}/${size}${link}`}
        alt='overlayed background'
        width={0}
        height={0}
        sizes='100%'
        priority
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
}
