import { Link } from 'react-router'
import type { Item } from '../types'

type ItemCardProps = {
  item: Item
  onTogglePacked: () => void // NYTT: anropas när kryssrutan klickas
}

const ItemCard = ({ item, onTogglePacked }: ItemCardProps) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={item.status === 'Packad'} // ikryssad om prylen är packad
          disabled={item.status === 'Att skaffa'} // går inte att packa det du inte har
          onChange={onTogglePacked}
        />
        Packad
      </label>

      <Link to={`/items/${item.id}`}>{item.title}</Link>

      {item.subtitle && <p>{item.subtitle}</p>}

      <p>
        <span>{item.category}</span>
        <span>{item.status}</span>
      </p>
    </li>
  )
}

export default ItemCard