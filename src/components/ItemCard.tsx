import { Link } from 'react-router'
import type { Item } from '../types'
import StatusPicker from './StatusPicker'

type ItemCardProps = {
  item: Item
  onStatusChange: (status: string) => void // NYTT: ersätter onTogglePacked
}

const ItemCard = ({ item, onStatusChange }: ItemCardProps) => {
  return (
    <li>
      <Link to={`/items/${item.id}`}>{item.title}</Link>
      {item.subtitle && <p>{item.subtitle}</p>}

      <StatusPicker
        itemId={item.id}
        itemTitle={item.title}
        status={item.status}
        onChange={onStatusChange}
      />
    </li>
  )
}

export default ItemCard