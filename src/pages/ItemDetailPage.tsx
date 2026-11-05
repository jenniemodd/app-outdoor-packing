import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import useItem from '../hooks/useItem'

const ItemDetailPage = () => {
  // 1. Hooks högst upp
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error } = useItem(id) // all hämtning sker i hooken
  const [deleteError, setDeleteError] = useState('')

  // 2. Funktioner
  const deleteItem = async () => {
    if (!item) return

    const isSure = window.confirm(`Vill du ta bort ${item.title}?`)
    if (!isSure) return

    setDeleteError('')
    try {
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok) {
        setDeleteError(data.message)
        return
      }

      navigate('/')
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Okänt fel')
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
    <article>
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}

      <h1>{item.title}</h1>
      {item.subtitle && <p>{item.subtitle}</p>}

      <p>
        <span>{item.category}</span>
        <span>{item.status}</span>
      </p>

      {item.tags.length > 0 && (
        <p>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      )}

      {item.rating !== null && <p>Betyg: {item.rating}/5</p>}
      {item.date && <p>Senast använd: {item.date}</p>}
      {item.notes && <p>{item.notes}</p>}

      <section>
        <Link to={`/items/${item.id}/edit`}>Ändra</Link>
        <button type="button" onClick={() => navigate(-1)}>Tillbaka</button>
        <button type="button" onClick={deleteItem}>Ta bort</button>
      </section>

      {deleteError && <p>Kunde inte ta bort prylen: {deleteError}</p>}
    </article>
  )
}

export default ItemDetailPage