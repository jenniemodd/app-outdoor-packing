import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import type { NewItem } from '../types'
import useItem from '../hooks/useItem'
import ItemForm from '../components/ItemForm'

const EditItemPage = () => {
  // 1. Hooks högst upp. Samma hook som på detaljsidan
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error } = useItem(id)
  const [saveError, setSaveError] = useState('')

  // 2. Funktioner
  const editItem = async (changes: NewItem) => {
    setSaveError('')
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      const data = await response.json()

      if (!response.ok) {
        setSaveError(data.message)
        return false
      }

      navigate(`/items/${data.id}`)
      return true
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Okänt fel')
      return false
    }
  }

  // 3. Tidiga return
  if (isLoading) return <p>Laddar pryl...</p>

  if (error || !item) {
    return (
      <>
        <h1>{error || 'Prylen hittades inte'}</h1>
        <Link to="/">Tillbaka till packlistan</Link>
      </>
    )
  }

  // 4. Själva sidan
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