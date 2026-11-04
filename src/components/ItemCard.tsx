import { Link } from 'react-router'
import type { Item } from '../types'

// Komponenten får en pryl via props
type ItemCardProps = {
  item: Item
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <li>
      {/* Titeln länkar till prylens egen sida, t.ex. /items/6b1f2a... */}
      <Link to={`/items/${item.id}`}>{item.title}</Link>

      {/* Visa bara undertiteln om den finns */}
      {item.subtitle && <p>{item.subtitle}</p>}

      <p>
        <span>{item.category}</span>
        <span>{item.status}</span>
      </p>
    </li>
  )
}

export default ItemCard