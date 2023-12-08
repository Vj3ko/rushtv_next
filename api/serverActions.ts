import { toast } from 'react-toastify'
import { MovieType } from 'types/movie'
import { PersonType } from 'types/person'
import { TvType } from 'types/tv'

export async function handleSaveFavoriteMovie(item: MovieType) {
  const response = await fetch(`/api/favorite/movies/${item.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: item.id.toString(),
      title: item.title,
      img: item.poster_path,
    }),
  })

  const { message } = await response.json()
  if (!response.ok) {
    toast.error(message)
    return false
  }

  toast.success(message)
  return true
}

export async function handleSaveFavoriteTvShow(item: TvType) {
  const response = await fetch(`/api/favorite/tv/${item.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: item.id.toString(),
      title: item.name,
      img: item.poster_path,
    }),
  })

  const { message } = await response.json()
  if (!response.ok) {
    toast.error(message)
    return false
  }

  toast.success(message)
  return true
}

export async function handleSaveFavoritePeople(item: PersonType) {
  const response = await fetch(`/api/favorite/people/${item.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: item.id.toString(),
      title: item.name,
      img: item.profile_path,
    }),
  })

  const { message } = await response.json()
  if (!response.ok) {
    toast.error(message)
    return false
  }

  toast.success(message)
  return true
}
