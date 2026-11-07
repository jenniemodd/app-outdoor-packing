import { Link, useNavigate, useParams } from 'react-router'
import useItem from '../hooks/useItem'
import useItemActions from '../hooks/useItemActions'
import { capitalize } from '../utils/format'
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

  // 4. Själva sidan
  return (
    <article className={styles.page}>
      <Link to="/" className={styles.back}>Tillbaka till packlistan</Link>

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