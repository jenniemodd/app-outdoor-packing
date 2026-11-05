import { useState } from 'react'
import { STATUSES } from '../config'
import StatusFilter from '../components/StatusFilter'
import ItemList from '../components/ItemList'

const ItemsPage = () => {
  // Sidan håller i valet. '' betyder Alla
  const [status, setStatus] = useState('')

  return (
    <>
      <h1>Alla prylar</h1>

      <StatusFilter
        statuses={STATUSES}
        selected={status}
        onChange={setStatus}
      />

      <ItemList status={status} />
    </>
  )
}

export default ItemsPage