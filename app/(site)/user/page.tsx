'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { Slider } from 'app/components/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { fetchFavoriteMovies } from 'routes/movies'
import { fetchFavoritePeople } from 'routes/person'
import { fetchFavoriteTvShows } from 'routes/tvShows'
import useSWR from 'swr'
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

  const { data: favoriteMovies, isLoading: isMoviesLoading } = useSWR(
    'movies',
    fetchFavoriteMovies,
  )

  const { data: favoriteTvShows, isLoading: isTvShowsLoading } = useSWR(
    'tv',
    fetchFavoriteTvShows,
  )

  const { data: favoritePeople, isLoading: isPeopleLoading } = useSWR(
    'people',
    fetchFavoritePeople,
  )

  return (
    <AnimatedComponent>
      <div className='container'>
        <section className='page__section'>
          {session && <UserInfo user={session?.user} />}
          <motion.div layout>
            <motion.section layout className='stats__section'>
              <motion.h2 layout>Favorite Movies</motion.h2>

              <AnimatePresence mode='wait'>
                {isMoviesLoading ? (
                  <p>Loading...</p>
                ) : !isMoviesLoading && favoriteMovies?.length > 0 ? (
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
                {isTvShowsLoading ? (
                  <p>Loading...</p>
                ) : !isTvShowsLoading && favoriteTvShows?.length > 0 ? (
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
                {isPeopleLoading ? (
                  <p>Loading...</p>
                ) : !isPeopleLoading && favoritePeople?.length > 0 ? (
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
