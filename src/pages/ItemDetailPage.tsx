import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import type { Item } from '../types'

const ItemDetailPage = () => {
  // Läser :id ur adressen. Är adressen /items/6aeb... blir id "6aeb..."
  const { id } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [item, setItem] = useState<Item | null>(null) // null = ingen pryl än

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()

        if (!response.ok) {
          // 404 betyder att det inte finns någon pryl med det id:t
          setError(response.status === 404 ? 'Prylen hittades inte' : data.message)
          return // viktigt: annars sparas felsvaret som om det vore en pryl
        }

        setItem(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Okänt fel')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [id]) // hämta igen om id:t i adressen ändras

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
    <article>
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}

      <h1>{item.title}</h1>
      {item.subtitle && <p>{item.subtitle}</p>}

      <p>
        <span>{item.category}</span>
        <span>{item.status}</span>
      </p>

      {/* Taggarna är en lista, så vi gör en <span> per tagg */}
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
      </section>
    </article>
  )
}

export default ItemDetailPage