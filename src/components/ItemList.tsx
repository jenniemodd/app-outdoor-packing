import useItems from '../hooks/useItems'
import ItemCard from './ItemCard'

type ItemListProps = {
  status: string
  activity: string
  duration: string
}

const ItemList = ({ status, activity, duration }: ItemListProps) => {
  const { items, isLoading, error, updateError, updateStatus } = useItems(status)

  const filteredItems = items.filter((item) =>
    (activity === '' || item.tags.includes(activity)) &&
    (duration === '' || item.tags.includes(duration))
  )

  // NYTT: visa bara "Laddar" när det inte finns något att visa än.
  // Annars blinkar hela listan varje gång du bockar i något
  if (isLoading && items.length === 0) return <p>Laddar packlista...</p>
  if (error) return <p>Kunde inte hämta packlistan: {error}</p>
  if (filteredItems.length === 0) return <p>Inga prylar matchar filtret.</p>

  return (
    <>
      {updateError && <p>Kunde inte spara: {updateError}</p>}

      <ul>
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            // NYTT: packad blir Har, Har blir Packad
            onTogglePacked={() =>
              updateStatus(item.id, item.status === 'Packad' ? 'Har' : 'Packad')
            }
          />
        ))}
      </ul>
    </>
  )
}

export default ItemList