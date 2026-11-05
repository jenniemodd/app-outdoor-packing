import { useState } from 'react'
import { ACTIVITIES, DURATIONS, STATUSES } from '../config'
import FilterButtons from '../components/FilterButtons'
import ItemList from '../components/ItemList'

const ItemsPage = () => {
  // Ett state per filter. '' betyder Alla
  const [status, setStatus] = useState('')
  const [activity, setActivity] = useState('')
  const [duration, setDuration] = useState('')

  return (
    <>
      <h1>Packlistan</h1>

      {/* Samma komponent tre gånger, med olika innehåll */}
      <FilterButtons label="Aktivitet" options={ACTIVITIES} selected={activity} onChange={setActivity} />
      <FilterButtons label="Turlängd" options={DURATIONS} selected={duration} onChange={setDuration} />
      <FilterButtons label="Status" options={STATUSES} selected={status} onChange={setStatus} />

      <ItemList status={status} activity={activity} duration={duration} />
    </>
  )
}

export default ItemsPage