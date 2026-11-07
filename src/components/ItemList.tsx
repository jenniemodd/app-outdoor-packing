import type { Item } from '../types'
import { groupByCategory } from '../utils/groupByCategory'
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

  const groups = groupByCategory(items)

  return (
    <div className={styles.groups}>
      {/* [category, groupItems] packar upp varje par: namnet och prylarna */}
      {groups.map(([category, groupItems], index) => {
        const packedCount = groupItems.filter((item) => item.status === 'Packad').length

        return (
          <section key={category} className={styles.group}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>
                {/* index börjar på 0, så +1. padStart gör 1 till "01" */}
                <span className={styles.groupNumber}>{String(index + 1).padStart(2, '0')}</span>
                {category}
              </h2>
              <span className={styles.groupCount}>
                {packedCount} av {groupItems.length}
              </span>
            </div>

            <ul className={styles.list}>
              {groupItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onStatusChange={(status) => onStatusChange(item, status)}
                />
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default ItemList