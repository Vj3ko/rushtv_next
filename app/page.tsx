import AnimatedComponent from 'animations/AnimatedComponent'
import entertainmentImg from 'images/home_bg.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { BsChevronCompactDown } from 'react-icons/bs'
import {
  comedyMoviesURL,
  crimeMoviesURL,
  getMovies,
  topRatedMoviesURL,
} from 'routes/movies'
import {
  comedyShowsURL,
  crimeShowsURL,
  getTvShows,
  topRatedShowsURL,
} from 'routes/tvShows'
import AnimatedImage from './components/AnimatedImage'
import { ScrollToContentBtn, ScrollTray } from './components/ui'
import styles from './homepage.module.scss'

export default async function Home() {
  const comedyMovies = await getMovies(comedyMoviesURL)
  const topRatedMovies = await getMovies(topRatedMoviesURL)
  const crimeMovies = await getMovies(crimeMoviesURL)

  const comedyShows = await getTvShows(comedyShowsURL)
  const topRatedShows = await getTvShows(topRatedShowsURL)
  const crimeShows = await getTvShows(crimeShowsURL)

  return (
    <AnimatedComponent>
      <div className={styles.hero}>
        <div className={styles.overlay} />
        <AnimatedImage>
          <Image
            src={entertainmentImg}
            alt=''
            priority
            className={styles.hero__img}
          />
        </AnimatedImage>

        <h1>
          Rush TV, the ultimate application for all your entertainment needs!
        </h1>
        <p>
          With Rush TV, you can embark on an exciting journey through the vast
          world of movies, TV shows and your favorite celebrities. Whether
          you&apos;re in the mood for a thrilling action-packed film, a
          heartwarming romance, or a gripping TV series, Rush TV has got you
          covered.
        </p>
        <ScrollToContentBtn href='#desc'>
          <button className={styles.scrollToContentBtn}>
            <BsChevronCompactDown color='silver' size={30} />
          </button>
        </ScrollToContentBtn>
      </div>

      <div className='container' id='desc'>
        <div className={styles.description}>
          <h2>
            Searching for your favorite movies or TV shows has never been easier
          </h2>
          <p>
            With our intuitive search feature, you can simply type in the title
            or keywords, and Rush TV will present you with a plethora of options
            to choose from. From classic blockbusters to the latest releases,
            our extensive library ensures that you&apos;ll find exactly what
            you&apos;re looking for.
          </p>
          <Link className={styles.explore} href={'/search'}>
            Start searching
          </Link>
        </div>
      </div>

      <ScrollTray
        direction='right'
        mediaType='movie'
        gallery={comedyMovies.results}
      />

      <ScrollTray
        direction='left'
        mediaType='movie'
        gallery={crimeMovies.results}
      />

      <ScrollTray
        direction='right'
        mediaType='movie'
        gallery={topRatedMovies.results}
      />

      <div className='container'>
        <div className={styles.description}>
          <h2>
            Explore an extensive library of TV shows and movies, covering a wide
            range of genres to suit every taste.
          </h2>
          <p>
            WWhether you&apos;re in the mood for action, comedy, romance, or
            something entirely different, Rush TV has you covered. Dive into
            popular releases, binge-worthy series, or discover hidden gems that
            will leave you wanting more.
          </p>
        </div>
      </div>

      <ScrollTray
        direction='left'
        mediaType='tv'
        gallery={comedyShows.results}
      />

      <ScrollTray
        direction='right'
        mediaType='tv'
        gallery={crimeShows.results}
      />

      <ScrollTray
        direction='left'
        mediaType='tv'
        gallery={topRatedShows.results}
      />
    </AnimatedComponent>
  )
}
