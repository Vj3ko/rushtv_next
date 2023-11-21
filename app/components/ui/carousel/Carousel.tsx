'use client'

import { modalVariant } from 'animations/variants'
import { IMG_URL } from 'constants/index'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Carousel.module.scss'

interface CarouselType<T> {
  data: T
  size?: string
}

export const Carousel = <T extends any[]>({ data, size }: CarouselType<T>) => {
  const [openModal, setOpenModal] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)

  function handleOpenImageModal(slide: any) {
    setInitialSlide(slide)
    setOpenModal(true)
    document.body.style.overflow = 'hidden'
  }

  function handleCloseImageModal() {
    setOpenModal(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <motion.div
            className={styles.modal}
            key='modal'
            onClick={handleCloseImageModal}
            variants={modalVariant}
            initial='closed'
            animate='open'
            exit='exit'>
            <button
              className={styles.modal__close_cta}
              onClick={handleCloseImageModal}>
              <AiOutlineClose size={30} />
            </button>
            <div
              className={`${styles.modal__wrapper} ${
                size === 'big' && styles.big
              }`}>
              <div
                onClick={e => e.stopPropagation()}
                style={{ position: 'relative' }}>
                <Swiper
                  allowTouchMove={false}
                  initialSlide={initialSlide}
                  spaceBetween={10}
                  loop={false}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  style={{ userSelect: 'none' }}
                  modules={[Navigation]}>
                  {data?.map((item: any, index: number) => (
                    <SwiperSlide
                      key={index}
                      className={styles.modal__swiper_slide}>
                      <Image
                        src={`${IMG_URL}/${size === 'big' ? 'w1280' : 'w500'}${
                          item.file_path
                        }`}
                        alt='carousel slider for selected content'
                        height={0}
                        width={0}
                        sizes='100%'
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                        }}
                        priority
                      />
                    </SwiperSlide>
                  ))}

                  <div className='slider__controler'>
                    <div className='swiper-button-prev slider-arrow' />
                    <div className='swiper-button-next slider-arrow' />
                  </div>
                </Swiper>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.carousel}>
        <Swiper
          spaceBetween={10}
          grabCursor={true}
          loop={false}
          slidesPerView={'auto'}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          style={{ userSelect: 'none' }}
          modules={[Navigation]}>
          {data.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className={`${styles.swiper__slide} ${
                size === 'big' && styles.big
              }`}
              onClick={() => handleOpenImageModal(index)}>
              <Image
                src={`${IMG_URL}/w500${item.file_path}`}
                alt='slide background'
                height={0}
                width={0}
                sizes='100%'
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}

          <div className={styles.slider__controler}>
            <div className='swiper-button-prev slider-arrow' />
            <div className='swiper-button-next slider-arrow' />
          </div>
        </Swiper>
      </div>
    </>
  )
}
