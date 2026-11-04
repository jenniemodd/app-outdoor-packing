import { useState } from 'react'
import { useNavigate } from 'react-router'
import { API_URL } from '../config'
import type { NewItem } from '../types'
import ItemForm from '../components/ItemForm'

const NewItemPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  // Den här funktionen skickas ner till formuläret som onSave
  const addItem = async (newItem: NewItem) => {
    setError('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // "det jag skickar är JSON"
        body: JSON.stringify(newItem), // gör om objektet till JSON-text
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return false
      }

      navigate(`/items/${data.id}`) // till den nya prylens sida
      return true
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Okänt fel')
      return false
    }
  }

  return (
    <>
      <h1>Lägg till pryl</h1>
      {error && <p>Kunde inte spara: {error}</p>}
      <ItemForm onSave={addItem} />
    </>
  )
}

export default NewItemPage