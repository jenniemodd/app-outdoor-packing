import { DURATIONS, STATUSES, ACTIVITIES } from '../config'
import type { Item, NewItem } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'
import useItems from '../hooks/useItems'
import useItemActions from '../hooks/useItemActions'
import FilterButtons from '../components/FilterButtons'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

const ItemsPage = () => {
  // 1. Hooks
  const [status, setStatus] = useLocalStorage('packlista-status', '')
  const [activity, setActivity] = useLocalStorage('packlista-activity', '')
  const [duration, setDuration] = useLocalStorage('packlista-duration', '')

  const { items, isLoading, error, updateError, updateStatus, reload } = useItems(status)
  const { createItem, error: createError } = useItemActions()

  // 2. Filtrera på taggar
  const filteredItems = items.filter((item) =>
    (activity === '' || item.tags.includes(activity)) &&
    (duration === '' || item.tags.includes(duration))
  )

  // 3. Funktioner
  const addItem = async (newItem: NewItem) => {
    const created = await createItem(newItem)
    if (!created) return false

    reload()
    return true
  }

  // NYTT: ersätter togglePacked. Skickar den status du valde
  const changeStatus = (item: Item, newStatus: string) => {
    if (newStatus === item.status) return // samma som förut: inget anrop behövs
    updateStatus(item.id, newStatus)
  }

  // 4. Själva sidan
  return (
    <>
      <h1>Packlistan</h1>

      <details>
        <summary>Lägg till pryl</summary>
        {createError && <p>Kunde inte spara: {createError}</p>}
        <ItemForm onSave={addItem} />
      </details>

      <FilterButtons label="Aktivitet" options={ACTIVITIES} selected={activity} onChange={setActivity} />
      <FilterButtons label="Turlängd" options={DURATIONS} selected={duration} onChange={setDuration} />
      <FilterButtons label="Status" options={STATUSES} selected={status} onChange={setStatus} />

      {updateError && <p>Kunde inte spara: {updateError}</p>}

      <ItemList
        items={filteredItems}
        isLoading={isLoading}
        error={error}
        onStatusChange={changeStatus}
      />
    </>
  )
}

export default ItemsPage