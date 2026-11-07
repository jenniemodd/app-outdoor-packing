import { Link, useNavigate, useParams } from 'react-router'
import useItem from '../hooks/useItem'
import useItemActions from '../hooks/useItemActions'
import { capitalize, formatDate } from '../utils/format'
import styles from './ItemDetailPage.module.css'

const ItemDetailPage = () => {
  // 1. Hooks
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error } = useItem(id)
  const { deleteItem, isSaving, error: deleteError } = useItemActions()

  // 2. Funktioner
  const handleDelete = async () => {
    if (!item) return

    const isSure = window.confirm(`Vill du ta bort ${item.title}?`)
    if (!isSure) return

    const success = await deleteItem(item.id)
    if (success) navigate('/')
  }

  // 3. Tidiga return
  if (isLoading) return <p className={styles.message}>Laddar pryl...</p>

  if (error || !item) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{error || 'Prylen hittades inte'}</h1>
        <Link to="/" className={styles.back}>Tillbaka till packlistan</Link>
      </div>
    )
  }

  // Sparas i en egen variabel, så att TypeScript vet att den inte är null längre ner
  const rating = item.rating

  // 4. Själva sidan
  return (
    <article className={styles.page}>
      <Link to="/" className={styles.back}>Tillbaka till packlistan</Link>

      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className={styles.image} />}

      <header className={styles.header}>
        <div className={styles.meta}>
          {item.category && <span className={styles.category}>{item.category}</span>}
          <span className={styles.status} data-status={item.status}>{item.status}</span>
        </div>
        <h1 className={styles.title}>{item.title}</h1>
        {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
      </header>

      {item.tags.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Används till</h2>
          <ul className={styles.tags}>
            {item.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{capitalize(tag)}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Visa bara rutorna om det finns ett betyg eller ett datum */}
      {(rating !== null || item.date) && (
        <dl className={styles.facts}>
          {rating !== null && (
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Betyg</dt>
              <dd className={styles.factValue}>
                {/* Prickarna är bara för ögat. Texten "4 av 5" läses av skärmläsare */}
                <span className={styles.dots} aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={styles.dot} data-filled={n <= rating} />
                  ))}
                </span>
                {rating} av 5
              </dd>
            </div>
          )}

          {item.date && (
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Senast använd</dt>
              <dd className={styles.factValue}>{formatDate(item.date)}</dd>
            </div>
          )}
        </dl>
      )}

      {item.notes && (
        <section className={styles.notes}>
          <h2 className={styles.sectionTitle}>Anteckningar</h2>
          <p className={styles.notesText}>{item.notes}</p>
        </section>
      )}

      <div className={styles.actions}>
        <div className={styles.mainActions}>
          <Link to={`/items/${item.id}/edit`} className={styles.primary}>Ändra</Link>
          <button type="button" className={styles.secondary} onClick={() => navigate(-1)}>
            Tillbaka
          </button>
        </div>

        {deleteError && <p className={styles.error}>Kunde inte ta bort prylen: {deleteError}</p>}

        <div className={styles.dangerZone}>
          <button type="button" className={styles.danger} onClick={handleDelete} disabled={isSaving}>
            {isSaving ? 'Tar bort...' : 'Ta bort pryl'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ItemDetailPage