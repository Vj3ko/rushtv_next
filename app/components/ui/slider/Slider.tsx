'use client'
import { IMG_URL } from 'constants/index'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Slider.module.scss'

const CardImage = ({ img, size }: { img: any; size: string | undefined }) => {
  return (
    <>
      {img.poster_path ||
      img.file_path ||
      img.still_path ||
      img.backdrop_path ||
      img.profile_path ? (
        <Image
          width={0}
          height={0}
          sizes='100%'
          style={{ width: '100%', height: 'auto' }}
          src={`${IMG_URL}/w500${
            img.poster_path ??
            img.file_path ??
            img.still_path ??
            img.backdrop_path ??
            img.profile_path
          }`}
          alt={img.title ?? img.name}
        />
      ) : (
        <Image
          src={
            size === 'big'
              ? '/assets/images/No-Image-Placeholder-Big.png'
              : '/assets/images/No-Image-Placeholder.svg.png'
          }
          alt='there is nothing to display'
          width={0}
          height={0}
          sizes='100%'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </>
  )
}

interface SliderType<T> {
  gallery: T
  mediaType?: string
  id?: string
  size?: string | undefined
}

interface SliderItemType {
  id: number
  season_number: number
  title?: string
  name?: string
  episode_number: number
  media_type: string
}

const SliderComponent = <T extends any[]>({
  gallery,
  mediaType,
  id,
  size,
}: SliderType<T>) => {
  const renderSlideItem = (item: SliderItemType) => {
    if (mediaType === 'season') {
      return (
        <SwiperSlide
          key={item.id}
          className={`${styles.swiper__slide} ${size === 'big' && styles.big}`}>
          <Link href={`/tv/${id}/season/${item.season_number}`}>
            <CardImage img={item} size={size} />
            <div className={styles.overlay}>
              <span className={styles.slide__title}>
                {item.title ?? item.name}
              </span>
            </div>
          </Link>
        </SwiperSlide>
      )
    } else if (mediaType === 'episode') {
      return (
        <SwiperSlide
          key={item.id}
          className={`${styles.swiper__slide} ${size === 'big' && styles.big}`}>
          <Link
            href={`/tv/${id}/season/${item.season_number}/episode/${item.episode_number}`}>
            <CardImage img={item} size={size} />
            <div className={styles.overlay}>
              <span className={styles.slide__title}>
                {item.title ?? item.name}
              </span>
            </div>
          </Link>
        </SwiperSlide>
      )
    } else {
      return (
        <SwiperSlide
          key={item.id + nanoid()}
          className={`${styles.swiper__slide} ${size === 'big' && styles.big}`}>
          <Link href={`/${item.media_type || mediaType}/${item.id}`}>
            <CardImage img={item} size={size} />
            <div className={styles.overlay}>
              <span className={styles.slide__title}>
                {item.title ?? item.name}
              </span>
            </div>
          </Link>
        </SwiperSlide>
      )
    }
  }

  return (
    <div className={styles.slider}>
      <Swiper
        spaceBetween={15}
        grabCursor={false}
        loop={false}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        style={{ userSelect: 'none' }}
        modules={[Navigation]}>
        {gallery?.map((item: SliderItemType) => renderSlideItem(item))}

        <div className={styles.slider__controler}>
          <div className='swiper-button-prev slider-arrow' />
          <div className='swiper-button-next slider-arrow' />
        </div>
      </Swiper>
    </div>
  )
}

export const Slider = React.memo(SliderComponent)
