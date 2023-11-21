'use client'

import { Pagination, Results, Slider, Spinner } from 'app/components/ui'
import axios from 'axios'
import { BASE_URL, KEY } from 'constants/index'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import AnimatedComponent from '../../animations/AnimatedComponent'
import styles from './SearchPage.module.scss'

const SearchPage = () => {
  const [pageValue, setPageValue] = useState(1)
  const [inputText, setInputText] = useState<string>('')
  const [data, setData] = useState<any>(null)
  const [showData, setShowData] = useState(false)
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const query = searchParams.get('q')

  const createNewQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const fetchData = (url: string) => {
    if (!showData) setLoading(true)
    if (url) {
      let isCancelled = false
      axios
        .get(url)
        .then(res => {
          if (!isCancelled) setData(res.data)
        })
        .finally(() => {
          setLoading(false)
          setShowData(true)
        })

      return () => (isCancelled = true)
    }
  }

  useEffect(() => {
    if (query) {
      fetchData(
        `${BASE_URL}/search/multi?api_key=${KEY}&language=en-US&query=${query}&page=${pageValue}&include_adult=false`,
      )
    }
  }, [query, pageValue])

  const callbackPageChange = useCallback((page: number) => {
    setPageValue(page)
  }, [])

  function resetSearch() {
    setInputText('')
    setShowData(false)
    setPageValue(1)
    setData(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputText && inputText.replace(/\s/g, '').length > 0) {
      router.replace(pathname + '?' + createNewQuery('q', inputText))
    }
  }

  if (loading) return <Spinner />

  return (
    <AnimatedComponent>
      <div className='container'>
        <div
          className={styles.search__section}
          style={{
            alignItems:
              showData && data?.results.length !== 0 ? 'start' : 'center',
          }}>
          <div className={styles.wrapper}>
            {!showData ? (
              <div>
                <h2>What are u looking for</h2>
                <p>Start searching by typing a word or a phrase.</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type='text'
                    autoFocus
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder='Enter search term'
                  />
                  <button>Search</button>
                </form>
              </div>
            ) : showData && data?.results.length !== 0 ? (
              <div style={{ width: '100%' }}>
                <div>
                  <h2 style={{ textAlign: 'left' }}>
                    Results for related term: <em>&apos;{query}&apos;</em>
                  </h2>
                  <p style={{ textAlign: 'left' }}>
                    Not exactly what you were searching for? Click{' '}
                    <Link onClick={resetSearch} href='/search'>
                      here
                    </Link>{' '}
                    to try again.
                  </p>

                  <div className={styles.list}>
                    <Slider
                      gallery={data?.results}
                      mediaType={data?.mediaType}
                    />

                    <div className={styles.results}>
                      <Results results={data?.total_results} />
                    </div>

                    <div className='pagination--wrapper'>
                      <Pagination
                        changePage={callbackPageChange}
                        totalPages={data?.total_pages}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2>
                  No results found for term: &apos;<em>{query}&apos;</em>
                </h2>
                <p>
                  Not exactly what you were searching for? Click{' '}
                  <Link onClick={resetSearch} href='/search'>
                    here
                  </Link>{' '}
                  to try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default SearchPage
