'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'react-headless-accordion'
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { isValidEmail } from 'utils'
import {
  movieGenre,
  optionMovie,
  optionPeople,
  optionTv,
  tvGenre,
} from 'utils/routesData'
import styles from './Footer.module.scss'

const Footer = () => {
  const [email, setEmail] = useState<string>('')

  function handleSubmit(): void {
    if (email && email.replace(/\s/g, '').length > 0) {
      if (isValidEmail(email)) {
        toast.success('Success, stay tuned for updates')
        setEmail('')
      } else {
        toast.error('Your email address is invalid.')
      }
    }
  }

  return (
    <div className='container'>
      <section className={styles.footer}>
        <nav className={styles.nav}>
          <div className={styles.nav__section}>
            <h3>Tv shows</h3>
            <ul>
              {optionTv.map(item => (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>

            <h4>By Genre</h4>
            <ul>
              {tvGenre.map(item => (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.nav__section}>
            <h3>Movies</h3>
            <ul>
              {optionMovie.map(item => (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>

            <h4>By Genre</h4>
            <ul>
              {movieGenre.map(item => (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.nav__section}>
            <h3>People</h3>
            <ul>
              {optionPeople.map(item => (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Accordions />

        <div className={styles.form}>
          <div>
            <h4>Stay in touch</h4>
            <div className={styles.form__cta}>
              <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>

            <p className={styles.updates__info}>
              By clicking the submit button, you agree to Rush TV using your
              email address to send you marketing communications, updates,
              special offers and other information about Rush TV. You can
              unsubscribe at any time. For more information on how we handle
              your personal data, please see our{' '}
              <a href='/' style={{ color: '#5468ff' }}>
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className={styles.border}></div>

          <div className={styles.social}>
            <FaFacebookSquare className={styles.social__icon} />
            <FaInstagramSquare className={styles.social__icon} />
            <FaTwitterSquare className={styles.social__icon} />
          </div>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.links__container}>
            <li>
              <a href='/'>Privacy Policy</a>
            </li>
            <li>
              <a href='/'>Manage Preferences</a>
            </li>
            <li>
              <a href='/'>Terms of use</a>
            </li>
            <li>
              <a href='/'>Help Center</a>
            </li>
            <li>
              <a href='/'>Corporate Info</a>
            </li>
          </ul>

          <p className={styles.rights}>
            ©{new Date().getFullYear()} Rush TV. All Rights Reserved. Rush TV
            is used under license.
          </p>
        </div>
      </section>
    </div>
  )
}

const Accordions = () => {
  return (
    <section className={styles.accordion__wrapper}>
      <Accordion
        className='accordion'
        transition={{
          duration: '500ms',
          timingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        }}>
        <AccordionItem>
          {({ open }: { open: boolean }) => (
            <>
              <AccordionHeader className={styles.accordion__header}>
                <h3>Tv Shows</h3>
                <span>{open ? '-' : '+'}</span>
              </AccordionHeader>

              <AccordionBody as={'ul'}>
                <>
                  {optionTv.map(item => (
                    <li key={item.name}>
                      <Link tabIndex={open ? 0 : -1} href={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  <h4>By Genre</h4>
                  {tvGenre.map(item => (
                    <li key={item.name}>
                      <Link tabIndex={open ? 0 : -1} href={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </>
              </AccordionBody>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ open }: { open: boolean }) => (
            <>
              <AccordionHeader className={styles.accordion__header}>
                <h3>Movies</h3>
                <span>{open ? '-' : '+'}</span>
              </AccordionHeader>

              <AccordionBody as={'ul'}>
                <>
                  {optionMovie.map(item => (
                    <li key={item.name}>
                      <Link tabIndex={open ? 0 : -1} href={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  <h4>By Genre</h4>
                  {movieGenre.map(item => (
                    <li key={item.name}>
                      <Link tabIndex={open ? 0 : -1} href={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </>
              </AccordionBody>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ open }: { open: boolean }) => (
            <>
              <AccordionHeader className={styles.accordion__header}>
                <h3>People</h3>
                <span>{open ? '-' : '+'}</span>
              </AccordionHeader>

              <AccordionBody as={'ul'}>
                {optionPeople.map(item => (
                  <li key={item.name}>
                    <Link tabIndex={open ? 0 : -1} href={item.link}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </AccordionBody>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export const MemoizedFooter = React.memo(Footer)
