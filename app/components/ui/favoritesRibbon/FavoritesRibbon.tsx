'use client'

import {
  handleSaveFavoriteMovie,
  handleSaveFavoritePeople,
  handleSaveFavoriteTvShow,
} from 'api/serverActions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { toast } from 'react-toastify'
import { MovieType } from 'types/movie'
import { PersonType } from 'types/person'
import { TvType } from 'types/tv'
import styles from './FavoritesRibbon.module.scss'

interface Favorite {
  item: MovieType | TvType | PersonType
  media: string
}

export const FavoritesRibbon = ({ item, media }: Favorite) => {
  const [isActive, setIsActive] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const checkIfAlreadySavedToFavorites = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/favorite/${media}/${item.id}`)

        if (!response.ok) {
          const { message } = await response.json()
          toast.error(message)
        }

        const { isSaved } = await response.json()
        setIsActive(isSaved)
      } catch (error) {
        console.log(`Error during check if favorite ${media} is saved`)
      }
    }

    if (session) {
      checkIfAlreadySavedToFavorites()
    }
  }, [session, item.id, media])

  const handleFavorite = async () => {
    let response
    if (media === 'movies') {
      response = await handleSaveFavoriteMovie(item as MovieType)
    }
    if (media === 'tv') {
      response = await handleSaveFavoriteTvShow(item as TvType)
    }
    if (media === 'people') {
      response = await handleSaveFavoritePeople(item as PersonType)
    }
    if (response) {
      setIsActive(prev => !prev)
    }
  }

  return (
    <>
      <div
        className={`${styles.ribbon} ${isActive && styles.active}`}
        onClick={handleFavorite}>
        <IoIosStar size={12} color='white' />
      </div>
    </>
  )
}
