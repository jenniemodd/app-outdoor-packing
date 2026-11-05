import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

// Hämtar alla prylar, eller bara de med vald status ('' = alla)
const useItems = (status: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError('')
      try {
        const url = status
          ? `${API_URL}?status=${encodeURIComponent(status)}`
          : API_URL

        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message)
          return
        }

        setItems(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Okänt fel')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [status])

  // Det här är "leveransen": det komponenten får tillbaka
  return { items, isLoading, error }
}

export default useItems