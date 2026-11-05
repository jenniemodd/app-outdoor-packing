import { ACTIVITIES, DURATIONS, STATUSES } from '../config'
import useLocalStorage from '../hooks/useLocalStorage'
import FilterButtons from '../components/FilterButtons'
import ItemList from '../components/ItemList'

const ItemsPage = () => {
  // Som useState, men valen sparas och finns kvar efter omladdning
  const [status, setStatus] = useLocalStorage('packlista-status', '')
  const [activity, setActivity] = useLocalStorage('packlista-activity', '')
  const [duration, setDuration] = useLocalStorage('packlista-duration', '')

  return (
    <>
      <h1>Packlistan</h1>

      <FilterButtons label="Aktivitet" options={ACTIVITIES} selected={activity} onChange={setActivity} />
      <FilterButtons label="Turlängd" options={DURATIONS} selected={duration} onChange={setDuration} />
      <FilterButtons label="Status" options={STATUSES} selected={status} onChange={setStatus} />

      <ItemList status={status} activity={activity} duration={duration} />
    </>
  )
}

export default ItemsPage