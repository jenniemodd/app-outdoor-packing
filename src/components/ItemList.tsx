import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Item } from '../types'
import ItemCard from './ItemCard'

const ItemList = () => {
  // true från början, så vi visar "Laddar..." direkt i stället för en tom lista
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState<Item[]>([])

  // Körs en gång när komponenten visas, tack vare den tomma listan [] längst ner
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        // response.ok är false vid felkoder som 400, 404 och 500
        if (!response.ok) {
          setError(data.message) // API:t skickar alltid { message: "..." } vid fel
          return
        }

        setItems(data)
      } catch (error) {
        // Hit kommer vi om anropet inte gick alls, t.ex. utan internet
        setError(error instanceof Error ? error.message : 'Okänt fel')
      } finally {
        // finally körs alltid, även efter return, så laddningen avslutas oavsett
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (isLoading) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (items.length === 0) return <p>Packlistan är tom. Lägg till din första pryl!</p>

  return (
    <ul>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default ItemList