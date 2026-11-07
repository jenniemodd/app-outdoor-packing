import type { Item } from '../types'
import ItemCard from './ItemCard'
import styles from './ItemList.module.css'

type ItemListProps = {
  items: Item[]
  isLoading: boolean
  error: string
  onStatusChange: (item: Item, status: string) => void
}

const ItemList = ({ items, isLoading, error, onStatusChange }: ItemListProps) => {
  if (isLoading && items.length === 0) return <p className={styles.message}>Laddar packlista...</p>
  if (error) return <p className={styles.message}>Kunde inte hämta packlistan: {error}</p>
  if (items.length === 0) return <p className={styles.message}>Inga prylar matchar filtret.</p>

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onStatusChange={(status) => onStatusChange(item, status)}
        />
      ))}
    </ul>
  )
}

export default ItemList