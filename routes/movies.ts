import { BASE_URL, KEY } from 'constants/index'

//Movies by genre
const comedyMoviesURL = `${BASE_URL}/discover/movie?api_key=${KEY}&include_adult=false&with_genres=35`
const crimeMoviesURL = `${BASE_URL}/discover/movie?api_key=${KEY}&include_adult=false&with_genres=80`

//Movies by views
const topRatedMoviesURL = `${BASE_URL}/movie/top_rated?api_key=${KEY}&include_adult=false`

export const getMovies = async (url: string) => {
  const res = await fetch(url, {
    next: {
      revalidate: 86400000,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movies data')
  }

  return res.json()
}

//fetch movie details
export const getMovieDetails = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

export { comedyMoviesURL, crimeMoviesURL, topRatedMoviesURL }
