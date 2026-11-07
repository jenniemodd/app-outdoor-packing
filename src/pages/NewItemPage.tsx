import { useNavigate } from 'react-router'
import type { NewItem } from '../types'
import useItemActions from '../hooks/useItemActions'
import ItemForm from '../components/ItemForm'
import styles from './FormPage.module.css'

const NewItemPage = () => {
  const navigate = useNavigate()
  const { createItem, error } = useItemActions()

  const addItem = async (newItem: NewItem) => {
    const created = await createItem(newItem)
    if (!created) return false

    navigate(`/items/${created.id}`)
    return true
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Lägg till pryl</h1>
      {error && <p className={styles.error}>Kunde inte spara: {error}</p>}
      <ItemForm onSave={addItem} />
    </div>
  )
}

export default NewItemPage