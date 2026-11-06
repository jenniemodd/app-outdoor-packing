import type { Item } from '../types'
import ItemCard from './ItemCard'

type ItemListProps = {
  items: Item[]
  isLoading: boolean
  error: string
  onStatusChange: (item: Item, status: string) => void // NYTT
}

const ItemList = ({ items, isLoading, error, onStatusChange }: ItemListProps) => {
  if (isLoading && items.length === 0) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (items.length === 0) return <p>Inga prylar matchar filtret.</p>

  return (
    <ul>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          // Kortet vet bara vilken status du valde. Här lägger vi till VILKEN pryl det gäller
          onStatusChange={(status) => onStatusChange(item, status)}
        />
      ))}
    </ul>
  )
}

export default ItemList