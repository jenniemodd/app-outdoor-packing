import { Link, useNavigate, useParams } from 'react-router'
import type { NewItem } from '../types'
import useItem from '../hooks/useItem'
import useItemActions from '../hooks/useItemActions'
import ItemForm from '../components/ItemForm'
import styles from './FormPage.module.css'

const EditItemPage = () => {
  // 1. Hooks
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error } = useItem(id)
  const { updateItem, error: saveError } = useItemActions()

  // 2. Funktioner
  const editItem = async (changes: NewItem) => {
    if (!id) return false

    const updated = await updateItem(id, changes)
    if (!updated) return false

    navigate(`/items/${updated.id}`)
    return true
  }

  // 3. Tidiga return
  if (isLoading) return <p className={styles.message}>Laddar pryl...</p>

  if (error || !item) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{error || 'Prylen hittades inte'}</h1>
        <Link to="/">Tillbaka till packlistan</Link>
      </div>
    )
  }

  // 4. Själva sidan
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ändra {item.title}</h1>
      {saveError && <p className={styles.error}>Kunde inte spara: {saveError}</p>}

      <ItemForm
        onSave={editItem}
                initialItem={{
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          status: item.status,
          tags: item.tags,
        }}
        submitLabel="Spara ändringar"
      />
    </div>
  )
}

export default EditItemPage