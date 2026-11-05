import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'

// Hämtar alla prylar, eller bara de med vald status ('' = alla)
const useItems = (status: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [items, setItems] = useState<Item[]>([])

  // NYTT: ett räkneverk. Varje gång talet ändras hämtas listan på nytt
  const [reloadKey, setReloadKey] = useState(0)

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
  }, [status, reloadKey]) // NYTT: hämta om när status ELLER reloadKey ändras

  // NYTT: ändra status på en pryl, och hämta sedan om listan
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdateError('')
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // skicka bara det som ändras
      })
      const data = await response.json()

      if (!response.ok) {
        setUpdateError(data.message)
        return
      }

      setReloadKey((key) => key + 1) // räkna upp, så körs useEffect igen
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Okänt fel')
    }
  }

  return { items, isLoading, error, updateError, updateStatus }
}

export default useItems