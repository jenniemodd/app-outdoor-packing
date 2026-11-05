import useItems from '../hooks/useItems'
import ItemCard from './ItemCard'

type ItemListProps = {
  status: string
  activity: string
  duration: string
}

const ItemList = ({ status, activity, duration }: ItemListProps) => {
  // Steg 1: API:t filtrerar på status
  const { items, isLoading, error } = useItems(status)

  // Steg 2: vi filtrerar själva på taggar, eftersom API:t inte kan det.
  // En pryl är med om filtret är "Alla" ('') ELLER om prylen har taggen
  const filteredItems = items.filter((item) =>
    (activity === '' || item.tags.includes(activity)) &&
    (duration === '' || item.tags.includes(duration))
  )

  if (isLoading) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (filteredItems.length === 0) return <p>Inga prylar matchar filtret.</p>

  return (
    <ul>
      {filteredItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default ItemList