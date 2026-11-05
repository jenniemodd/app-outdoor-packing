import type { Item } from '../types'
import ItemCard from './ItemCard'

// ItemList hämtar ingenting själv längre. Den visar bara det den får
type ItemListProps = {
  items: Item[]
  isLoading: boolean
  error: string
  onTogglePacked: (item: Item) => void
}

const ItemList = ({ items, isLoading, error, onTogglePacked }: ItemListProps) => {
  if (isLoading && items.length === 0) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (items.length === 0) return <p>Inga prylar matchar filtret.</p>

  return (
    <ul>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onTogglePacked={() => onTogglePacked(item)}
        />
      ))}
    </ul>
  )
}

export default ItemList