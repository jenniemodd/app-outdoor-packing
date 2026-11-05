import useItems from '../hooks/useItems'
import ItemCard from './ItemCard'

type ItemListProps = {
  status: string
}

const ItemList = ({ status }: ItemListProps) => {
  // All hämtning sker i hooken. Komponenten bryr sig bara om vad den ska visa
  const { items, isLoading, error } = useItems(status)

  if (isLoading) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (items.length === 0) return <p>Inga prylar här ännu.</p>

  return (
    <ul>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default ItemList