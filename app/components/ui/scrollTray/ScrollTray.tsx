import { IMG_URL } from 'constants/index'
import Image from 'next/image'
import Link from 'next/link'
import { Result } from 'types/list'
import styles from './ScrollTray.module.scss'

type directionOptions = 'left' | 'right'

interface ScrollTrayType<T> {
  direction: directionOptions
  gallery: T
  mediaType: string
}

export const ScrollTray = <T extends any[]>({
  direction,
  gallery,
  mediaType,
}: ScrollTrayType<T>) => {
  return (
    <div className={styles.tray__wrapper}>
      <div className={styles.slider}>
        <div className={`${styles.slide_track} ${styles[direction]}`}>
          {gallery.map((item: Result) => (
            <div className={styles.slide} key={item.id}>
              <Link href={`/${mediaType}/${item.id}`} tabIndex={-1}>
                {item.backdrop_path ? (
                  <Image
                    src={`${IMG_URL}/w500${item.backdrop_path}`}
                    alt={item.name ?? item.title}
                    fill
                    sizes='100%'
                    className={styles.img}
                    priority
                  />
                ) : (
                  <Image
                    src={'/assets/images/No-Image-Placeholder.svg.png'}
                    alt='there is nothing to display'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <div className={styles.overlay}>
                  <div className={styles.overlay__inner}>
                    <h4>
                      {item.name ?? item.title}{' '}
                      {!!item?.vote_average && (
                        <span>({item.vote_average.toFixed(1)})</span>
                      )}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
