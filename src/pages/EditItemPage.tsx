import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import type { Item, NewItem } from '../types'
import ItemForm from '../components/ItemForm'

const EditItemPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [item, setItem] = useState<Item | null>(null)

  // 1. Hämta prylen, samma som på detaljsidan
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

  // 2. Spara ändringarna med PATCH
  const editItem = async (changes: NewItem) => {
    setSaveError('')
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH', // ändra bara det som skickas
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      const data = await response.json()

      if (!response.ok) {
        setSaveError(data.message)
        return false
      }

      navigate(`/items/${data.id}`) // tillbaka till prylens sida
      return true
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Okänt fel')
      return false
    }
  }

  if (isLoading) return <p>Laddar pryl...</p>

  if (error || !item) {
    return (
      <>
        <h1>{error || 'Prylen hittades inte'}</h1>
        <Link to="/">Tillbaka till packlistan</Link>
      </>
    )
  }

  return (
    <>
      <h1>Ändra {item.title}</h1>
      {saveError && <p>Kunde inte spara: {saveError}</p>}

      <ItemForm
        onSave={editItem}
        initialItem={{
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          status: item.status,
          tags: item.tags,
          notes: item.notes,
        }}
        submitLabel="Spara ändringar"
      />
    </>
  )
}

export default EditItemPage