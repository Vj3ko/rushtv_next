'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { Pagination, Results, Slider } from 'app/components/ui'
import { BASE_URL, KEY } from 'constants/index'
import { useFetch } from 'hooks/useFetch'
import Link from 'next/link'
import { useCallback, useState } from 'react'

interface Custom {
  title: string
  mediaType: string
  type: string
}

const CustomList = ({ mediaType, title, type }: Custom) => {
  const [pageValue, setPageValue] = useState(1)

  const { data } = useFetch<any>({
    url: `${BASE_URL}/${mediaType}/${type}?api_key=${KEY}&include_adult=false&page=${pageValue}`,
  })

  const changePage = useCallback((page: number) => {
    setPageValue(page)
  }, [])

  return (
    <AnimatedComponent key={`${mediaType}--${title}--${type}`}>
      <section className='list__section'>
        <div className='container'>
          <h2>{title}</h2>
          <p>
            Not happy with the results? You can always use our{' '}
            <Link href='/search'>search</Link> option.
          </p>

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

export default CustomList
