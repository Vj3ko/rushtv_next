'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { Pagination, Results, Slider } from 'app/components/ui'
import { BASE_URL, KEY } from 'constants/index'
import { useFetch } from 'hooks/useFetch'
import Link from 'next/link'
import { useCallback, useState } from 'react'

interface Genre {
  title: string
  mediaType: string
  genre: string
}

const GenreList = ({ mediaType, title, genre }: Genre) => {
  const [pageValue, setPageValue] = useState(1)
  const [filter, setFilter] = useState('vote_count.desc')

  const { data } = useFetch<any>({
    url: `${BASE_URL}/discover/${mediaType}?api_key=${KEY}&include_adult=false&page=${pageValue}&with_genres=${genre}&sort_by=${filter}`,
  })

  const changePage = useCallback((page: number) => setPageValue(page), [])

  return (
    <AnimatedComponent>
      <section className='list__section'>
        <div className='container'>
          <h2>{title}</h2>
          <p>
            Not happy with the results? You can always use our{' '}
            <Link href='/search'>search</Link> option.
          </p>

          <div className='filter__btns'>
            <div
              className='filter'
              onClick={() => setFilter('popularity.desc')}>
              Most Popular
            </div>
            <div
              className='filter'
              onClick={() => setFilter('vote_count.desc')}>
              Most Voted
            </div>
            <div className='filter' onClick={() => setFilter('popularity.asc')}>
              Least Popular
            </div>
            <div className='filter' onClick={() => setFilter('revenue.desc')}>
              Biggest Revenue
            </div>
            <div
              className='filter'
              onClick={() => setFilter('primary_release_date.desc')}>
              Latest
            </div>
            <div
              className='filter'
              onClick={() => setFilter('primary_release_date.asc')}>
              Oldest
            </div>
          </div>

          <div className='list'>
            <Slider gallery={data?.results} mediaType={mediaType} />

            <div className='results'>
              <Results results={data?.total_results} />
            </div>

            <div className='pagination--wrapper'>
              <Pagination
                changePage={changePage}
                totalPages={data?.total_pages}
              />
            </div>
          </div>
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default GenreList
