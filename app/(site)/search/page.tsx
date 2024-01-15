'use client'

import AnimatedComponent from 'animations/AnimatedComponent'
import { Pagination, Results, Slider, Spinner } from 'app/components/ui'
import { BASE_URL, KEY } from 'constants/index'
import { AnimatePresence, motion } from 'framer-motion'
import { useFetch } from 'hooks/useFetch'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import styles from './SearchPage.module.scss'

const INITIAL_PAGE_VALUE: number = 1
const sectionAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
}

const SearchPage = () => {
  const [pageValue, setPageValue] = useState(INITIAL_PAGE_VALUE)
  const [inputText, setInputText] = useState<string>('')
  const [shouldShowData, setShouldShowData] = useState(false)
  const [query, setQuery] = useState('')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const { data, resetData, loading } = useFetch<any>({
    url: `${BASE_URL}/search/multi?api_key=${KEY}&language=en-US&query=${query}&page=${pageValue}&include_adult=false`,
  })

  const createNewQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const callbackPageChange = useCallback((page: number) => {
    setPageValue(page)
  }, [])

  function resetSearch() {
    resetData()
    setInputText('')
    setQuery('')
    setPageValue(INITIAL_PAGE_VALUE)
    setShouldShowData(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = inputText
    const isTrimmedText = inputText.replace(/\s/g, '').length > 0
    if (text && isTrimmedText) {
      router.replace(pathname + '?' + createNewQuery('q', text))
      setQuery(text)
      setShouldShowData(true)
    }
  }

  return (
    <AnimatedComponent>
      <div className='container'>
        <div
          className={styles.search__section}
          style={{
            alignItems: 'center',
            // showData && data?.results.length !== 0 ? 'start' : 'center',
            // alignItems: data && data?.results.length !== 0 ? 'start' : 'center',
          }}>
          <div className={styles.wrapper}>
            {/* on component mount show the search form */}
            {!shouldShowData ? (
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
            ) : data?.results.length !== 0 && shouldShowData ? (
              /* show the data if data exist depending on search query */
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
              data?.results.length === 0 &&
              shouldShowData &&
              !loading && (
                /* show message if the searched data does not exist */
                <AnimatePresence>
                  <motion.div
                    variants={sectionAnimation}
                    initial='hide'
                    animate='show'>
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
                  </motion.div>
                </AnimatePresence>
              )
            )}
          </div>
        </div>
      </div>
    </AnimatedComponent>
  )
}

export default SearchPage
