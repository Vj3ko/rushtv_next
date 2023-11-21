'use client'

import dynamic from 'next/dynamic'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './VideoGallery.module.scss'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

interface VideosGalleryType<T> {
  gallery: T
}

export const VideoGallery = <T extends any[]>({
  gallery,
}: VideosGalleryType<T>) => {
  return (
    <div className={styles.gallery}>
      <Swiper
        spaceBetween={10}
        loop={false}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        style={{ userSelect: 'none' }}
        modules={[Navigation]}>
        {gallery?.map(item => (
          <SwiperSlide key={item.id} className={styles.swiper__slide}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${item.key}`}
              playing={false}
              width={'100%'}
              height={'100%'}
              light={true}
              controls={true}
            />
          </SwiperSlide>
        ))}

        <div className={styles.slider__controler}>
          <div className='swiper-button-prev slider-arrow' />
          <div className='swiper-button-next slider-arrow' />
        </div>
      </Swiper>
    </div>
  )
}
