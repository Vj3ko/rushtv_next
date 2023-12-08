import { BASE_URL, KEY } from 'constants/index'

//fetch person details
export const getPersonDetails = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/person/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch person details')
  }

  return res.json()
}
