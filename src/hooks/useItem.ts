import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

// Hämtar EN pryl. id kommer från useParams, som kan vara undefined enligt TypeScript
const useItem = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(response.status === 404 ? 'Prylen hittades inte' : data.message)
          return
        }

        setItem(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Okänt fel')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [id])

  return { item, isLoading, error }
}

export default useItem