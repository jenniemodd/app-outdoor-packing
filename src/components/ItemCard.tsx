import { Link } from 'react-router'
import type { Item } from '../types'
import StatusPicker from './StatusPicker'
import styles from './ItemCard.module.css'

type ItemCardProps = {
  item: Item
  onStatusChange: (status: string) => void
}

const ItemCard = ({ item, onStatusChange }: ItemCardProps) => {
  return (

    <li className={styles.item} data-status={item.status}>
      <div className={styles.text}>
        <Link to={`/items/${item.id}`} className={styles.title}>
          {item.title}
        </Link>
        {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
      </div>

      <div className={styles.status}>
        <StatusPicker
          itemId={item.id}
          itemTitle={item.title}
          status={item.status}
          onChange={onStatusChange}
        />
      </div>
    </li>
  )
}

export default ItemCard