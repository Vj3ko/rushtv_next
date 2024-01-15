'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface FetchOptions {
  url: string
}

interface FetchData<T> {
  data: T | null
  loading: boolean
  error: any
  resetData: () => void
}

export const useFetch = <T>(options: FetchOptions): FetchData<T> => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const resetData = () => setData(null)

  useEffect(() => {
    setLoading(true)
    if (options.url) {
      let isCancelled: boolean = false
      axios
        .get(options.url)
        .then(res => {
          if (!isCancelled) setData(res.data)
        })
        .catch(err => setError(err))
        .finally(() => {
          setLoading(false)
        })

      return () => {
        isCancelled = true
      }
    }
  }, [options.url])

  return { data, loading, error, resetData }
}
