import { BASE_URL, KEY } from 'constants/index'

//fetch person details
const getPersonDetails = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/person/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch person details')
  }

  return res.json()
}

//get favorite people
const fetchFavoritePeople = async () => {
  const response = await fetch('/api/favorite/people')
  const data = await response.json()

  const favoriteTvPeople = data
    .map((person: any) => {
      return {
        id: person.personId,
        title: person.personTitle,
        poster_path: person.personImg,
      }
    })
    .reverse()

  return favoriteTvPeople
}

export { fetchFavoritePeople, getPersonDetails }
