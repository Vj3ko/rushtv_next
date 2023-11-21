import { IMG_URL } from 'constants/index'
import placeholder from 'images/No-Image-Placeholder.svg.png'
import Image from 'next/image'
import styles from './CustomImg.module.scss'

interface CustomImgType {
  size: string
  link: string | undefined
}

export const CustomImg = async ({ size, link }: CustomImgType) => {
  return (
    <div className={styles.img__wrapper}>
      {link ? (
        <Image
          src={`${IMG_URL}/${size}${link}`}
          width={0}
          height={0}
          sizes='100%'
          priority
          alt='poster'
          style={{ width: '100%', height: 'auto' }}
        />
      ) : (
        <div className={styles.placeholder__cover}>
          <Image src={placeholder} alt='there is nothing to display' />
        </div>
      )}
    </div>
  )
}
