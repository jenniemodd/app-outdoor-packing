import { useState } from 'react'
import { API_URL } from '../config'
import type { Item, NewItem } from '../types'

// Allt som ÄNDRAR data: skapa, ändra och ta bort
const useItemActions = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  // Den gemensamma logiken. Skickar ett anrop och returnerar svaret, eller null om det gick fel
  const sendRequest = async (url: string, method: string, body?: NewItem) => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined, // DELETE skickar ingen body
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return null
      }

      return data
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Okänt fel')
      return null
    } finally {
      setIsSaving(false)
    }
  }

  // De tre funktionerna fyller bara i det som skiljer: adress, metod och innehåll
  const createItem = (newItem: NewItem): Promise<Item | null> =>
    sendRequest(API_URL, 'POST', newItem)

  const updateItem = (id: string, changes: NewItem): Promise<Item | null> =>
    sendRequest(`${API_URL}/${id}`, 'PATCH', changes)

  const deleteItem = async (id: string): Promise<boolean> => {
    const result = await sendRequest(`${API_URL}/${id}`, 'DELETE')
    return result !== null // true om det gick bra
  }

  return { createItem, updateItem, deleteItem, isSaving, error }
}

export default useItemActions