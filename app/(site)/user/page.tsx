'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { Slider } from 'app/components/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import UserInfo from './userInfo/UserInfo'

const sliderVariant = {
  hide: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
}

const UserPage = () => {
  const { data: session } = useSession()
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [favoriteTvShows, setFavoriteTvShows] = useState([])
  const [favoritePeople, setFavoritePeople] = useState([])
  const [isLoadingMovies, setIsLoadingMovies] = useState(false)
  const [isLoadingTvShows, setIsLoadingTvShows] = useState(false)
  const [isLoadingPeople, setIsLoadingPeople] = useState(false)

  useEffect(() => {
    if (session) {
      getFavoriteMovies()
      getFavoriteTvShows()
      getFavoritePeople()
    }
  }, [session])

  const getFavoriteMovies = async () => {
    setIsLoadingMovies(true)
    const response = await fetch('/api/favorite/movies', {
      cache: 'no-cache',
    })

    const data = await response.json()

    if (!data || data.length === 0) {
      setIsLoadingMovies(false)
      return
    }

    const favorites = data
      .map((movie: any) => {
        return {
          id: movie.movieId,
          title: movie.movieTitle,
          poster_path: movie.movieImg,
        }
      })
      .reverse()

    setFavoriteMovies(favorites)
    setIsLoadingMovies(false)
  }

  const getFavoriteTvShows = async () => {
    setIsLoadingTvShows(true)
    const response = await fetch('/api/favorite/tv', {
      cache: 'no-cache',
    })

    const data = await response.json()

    if (!data || data.length === 0) {
      setIsLoadingTvShows(false)
      return
    }

    const favorites = data
      .map((tv: any) => {
        return {
          id: tv.tvId,
          title: tv.tvTitle,
          poster_path: tv.tvImg,
        }
      })
      .reverse()

    setFavoriteTvShows(favorites)
    setIsLoadingTvShows(false)
  }

  const getFavoritePeople = async () => {
    setIsLoadingPeople(true)
    const response = await fetch('/api/favorite/people', {
      cache: 'no-store',
    })

    const data = await response.json()

    if (!data || data.length === 0) {
      setIsLoadingPeople(false)
      return
    }

    const favorites = data
      .map((person: any) => {
        return {
          id: person.personId,
          title: person.personTitle,
          poster_path: person.personImg,
        }
      })
      .reverse()

    setFavoritePeople(favorites)
    setIsLoadingPeople(false)
  }

  return (
    <AnimatedComponent>
      <div className='container'>
        <section className='page__section'>
          {session && <UserInfo user={session?.user} />}
          <motion.div layout>
            <motion.section layout className='stats__section'>
              <motion.h2 layout>Favorite Movies</motion.h2>

              <AnimatePresence mode='wait'>
                {isLoadingMovies ? (
                  <p>Loading...</p>
                ) : !isLoadingMovies && favoriteMovies?.length > 0 ? (
                  <motion.div
                    variants={sliderVariant}
                    initial='hide'
                    animate='show'
                    layout>
                    <Slider gallery={favoriteMovies} mediaType='movie' />
                  </motion.div>
                ) : (
                  <p>You have no favorite movies</p>
                )}
              </AnimatePresence>
            </motion.section>

            <motion.section layout className='stats__section'>
              <motion.h2 layout>Favorite tv shows</motion.h2>
              <AnimatePresence mode='wait'>
                {isLoadingTvShows ? (
                  <p>Loading...</p>
                ) : !isLoadingTvShows && favoriteTvShows?.length > 0 ? (
                  <motion.div
                    variants={sliderVariant}
                    initial='hide'
                    animate='show'
                    layout>
                    <Slider gallery={favoriteTvShows} mediaType='tv' />
                  </motion.div>
                ) : (
                  <p>You have no favorite tv shows</p>
                )}
              </AnimatePresence>
            </motion.section>

            <motion.section layout className='stats__section'>
              <motion.h2 layout>Favorite people</motion.h2>

              <AnimatePresence mode='wait'>
                {isLoadingPeople ? (
                  <p>Loading...</p>
                ) : !isLoadingPeople && favoritePeople?.length > 0 ? (
                  <motion.div
                    variants={sliderVariant}
                    initial='hide'
                    animate='show'
                    layout>
                    <Slider gallery={favoritePeople} mediaType='person' />
                  </motion.div>
                ) : (
                  <p>You have no favorite people</p>
                )}
              </AnimatePresence>
            </motion.section>
          </motion.div>
        </section>
      </div>
    </AnimatedComponent>
  )
}

export default UserPage
