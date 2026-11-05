import { useState } from 'react'
import { STATUSES } from '../config'
import FilterButtons from '../components/FilterButtons'
import ItemList from '../components/ItemList'

const ItemsPage = () => {
  const [status, setStatus] = useState('')

  return (
    <>
      <h1>Alla prylar</h1>

      <FilterButtons
        label="Status"
        options={STATUSES}
        selected={status}
        onChange={setStatus}
      />

      <ItemList status={status} />
    </>
  )
}

export default ItemsPage