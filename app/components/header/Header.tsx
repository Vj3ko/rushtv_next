'use client'

import { headerVariant, menuBtnVariant, navVariant } from 'animations/variants'
import { AnimatePresence, motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { RiMenu3Line } from 'react-icons/ri'
import {
  movieGenre,
  optionMovie,
  optionPeople,
  optionTv,
  tvGenre,
} from 'utils/routesData'
import styles from './Header.module.scss'

const Navigation = () => {
  const [isNav, setIsNav] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [navColor, setNavColor] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { data: session } = useSession()

  function controlNav(): void {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 20) {
        setNavColor(true)
      } else {
        setNavColor(false)
      }

      if (window.scrollY > 1100 && window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setIsNav(false)
      } else {
        // if scroll up show the navbar
        setIsNav(true)
      }

      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (openMenu) {
      setNavColor(true)
      document.body.style.overflowY = 'hidden'
    } else if (!openMenu && window.scrollY < 20) {
      setNavColor(false)
      document.body.style.overflowY = 'auto'
    } else {
      document.body.style.overflowY = 'auto'
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNav)

      return () => {
        window.removeEventListener('scroll', controlNav)
      }
    }
  }, [lastScrollY, openMenu])

  return (
    <AnimatePresence>
      {isNav && (
        <motion.header
          className={`${styles.header} ${navColor ? styles.transparent : null}`}
          key={'header'}
          initial='closed'
          animate='open'
          exit='exit'
          variants={headerVariant}>
          <motion.div
            className={`${styles.overlay} ${openMenu && styles.active}`}
            key={isNav ? 'true' : 'false'}
            animate={{ height: '100vh', transition: { duration: 0.2 } }}
            onClick={() => setOpenMenu(false)}
          />

          <div className={styles.header__wrapper}>
            <Link
              href='/'
              onClick={() => (openMenu ? setOpenMenu(false) : null)}>
              <h1 className={styles.header__logo}>Rush TV</h1>
            </Link>

            <div className={styles.header__action}>
              {session && <button onClick={() => signOut()}>logout</button>}

              <Link href={'/user'} style={{ backgroundColor: 'transparent' }}>
                <FaUser color='white' size={20} />
              </Link>

              <Link
                href='/search'
                onClick={() => (openMenu ? setOpenMenu(false) : null)}>
                <BsSearch color='white' size={20} />
              </Link>
              <button
                className={styles.header__cta}
                onClick={() => setOpenMenu(p => !p)}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={openMenu ? 'true' : 'false'}
                    variants={menuBtnVariant}
                    initial='closed'
                    animate='open'
                    exit='exit'>
                    {openMenu ? (
                      <AiOutlineClose color='white' size={30} />
                    ) : (
                      <RiMenu3Line color='white' size={30} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>

            <AnimatePresence>
              {openMenu && (
                <motion.nav
                  className={styles.nav}
                  key={openMenu ? 'true' : 'false'}
                  variants={navVariant}
                  initial='closed'
                  animate='open'
                  exit='exit'>
                  <div className={styles.nav__wrapper}>
                    <div className={styles.nav__section}>
                      <h3>Tv shows</h3>
                      <ul>
                        {optionTv.map(item => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setOpenMenu(false)}
                              href={item.link}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <h4>By Genre</h4>
                      <ul>
                        {tvGenre.map(item => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setOpenMenu(false)}
                              href={item.link}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.nav__section}>
                      <h3>Movies</h3>
                      <ul>
                        {optionMovie.map(item => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setOpenMenu(false)}
                              href={item.link}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <h4>By Genre</h4>
                      <ul>
                        {movieGenre.map(item => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setOpenMenu(false)}
                              href={item.link}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.nav__section}>
                      <h3>People</h3>
                      <ul>
                        {optionPeople.map(item => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setOpenMenu(false)}
                              href={item.link}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

export const MemoizedNavigation = React.memo(Navigation)
