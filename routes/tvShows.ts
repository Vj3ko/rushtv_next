import { BASE_URL, KEY } from 'constants/index'

//TV Shows
const comedyShowsURL = `${BASE_URL}/discover/tv?api_key=${KEY}&include_adult=false&with_genres=35`
const topRatedShowsURL = `${BASE_URL}/tv/top_rated?api_key=${KEY}&include_adult=false`
const crimeShowsURL = `${BASE_URL}/discover/tv?api_key=${KEY}&include_adult=false&with_genres=80`

export const getTvShows = async (url: string) => {
  const res = await fetch(url, {
    next: {
      revalidate: 86400000,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch tv show data')
  }

  return res.json()
}

//fetch tv show details
export const getTvShowDetails = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

export const getTvShowMinorDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${KEY}`)

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

//fetch tv show season details
export const getTvShowSeasonDetails = async (id: string, number: string) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/season/${number}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch season details')
  }

  return res.json()
}

//fetch tv show episode details
export const getTvShowEpisodeDetails = async (
  id: string,
  season: string,
  episode: string,
) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/season/${season}/episode/${episode}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch episode details')
  }

  return res.json()
}

export { comedyShowsURL, crimeShowsURL, topRatedShowsURL }
