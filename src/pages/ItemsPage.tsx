import { ACTIVITIES, DURATIONS, STATUSES } from '../config'
import type { Item, NewItem } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'
import useItems from '../hooks/useItems'
import useItemActions from '../hooks/useItemActions'
import { capitalize } from '../utils/format'
import FilterButtons from '../components/FilterButtons'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'
import styles from './ItemsPage.module.css'

const ItemsPage = () => {
  // 1. Hooks
  const [status, setStatus] = useLocalStorage('packlista-status', '')
  const [activity, setActivity] = useLocalStorage('packlista-activity', '')
  const [duration, setDuration] = useLocalStorage('packlista-duration', '')

  // Prylarna som visas i listan (filtrerade på status av API:t)
  const { items, isLoading, error, updateError, updateStatus, reload } = useItems(status)
  // NYTT: alla prylar, för att räkna förloppet oavsett statusfilter
  const { items: allItems, reload: reloadAll } = useItems('')
  const { createItem, error: createError } = useItemActions()

  // 2. Filtrera på taggar
  // NYTT: frågan ligger i en egen funktion, så att den kan användas två gånger
  const matchesTags = (item: Item) =>
    (activity === '' || item.tags.includes(activity)) &&
    (duration === '' || item.tags.includes(duration))

  const filteredItems = items.filter(matchesTags) // till listan
  const tripItems = allItems.filter(matchesTags) // NYTT: hela packningen för vald aktivitet

  // NYTT: räkna förloppet
  const packedCount = tripItems.filter((item) => item.status === 'Packad').length
  const toBuyCount = tripItems.filter((item) => item.status === 'Att skaffa').length
  const percent = tripItems.length > 0 ? (packedCount / tripItems.length) * 100 : 0

  // NYTT: rubriken, t.ex. "Vandring, flerdagstur". Inga filter valda: "Alla prylar"
  const tripParts = [activity, duration].filter((part) => part !== '')
  const tripTitle = tripParts.length > 0 ? capitalize(tripParts.join(', ')) : 'Alla prylar'

  // 3. Funktioner
  const addItem = async (newItem: NewItem) => {
    const created = await createItem(newItem)
    if (!created) return false

    reload()
    reloadAll() // NYTT: även förloppet ska uppdateras
    return true
  }

  // NYTT: async, så att vi kan vänta in sparningen innan förloppet hämtas om
  const changeStatus = async (item: Item, newStatus: string) => {
    if (newStatus === item.status) return
    await updateStatus(item.id, newStatus)
    reloadAll()
  }

  // 4. Själva sidan
  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Din packning</p>
          <h1 className={styles.title}>{tripTitle}</h1>
        </div>

        {tripItems.length > 0 && (
          <div className={styles.progress}>
            <div className={styles.progressText}>
              <span>
                <strong>{packedCount} av {tripItems.length}</strong> packade
              </span>
              {toBuyCount > 0 && <span className={styles.toBuy}>{toBuyCount} att skaffa</span>}
            </div>
            {/* Stapeln är bara för ögat, texten ovanför säger samma sak */}
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressBar} style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </section>

      <section className={styles.filters} aria-label="Filter">
        <FilterButtons label="Aktivitet" options={ACTIVITIES} selected={activity} onChange={setActivity} />
        <FilterButtons label="Turlängd" options={DURATIONS} selected={duration} onChange={setDuration} />
        <FilterButtons label="Status" options={STATUSES} selected={status} onChange={setStatus} />
      </section>

      <details className={styles.addItem}>
        <summary className={styles.addItemSummary}>Lägg till pryl</summary>
        <div className={styles.addItemContent}>
          {createError && <p className={styles.error}>Kunde inte spara: {createError}</p>}
          <ItemForm onSave={addItem} />
        </div>
      </details>

      {updateError && <p className={styles.error}>Kunde inte spara: {updateError}</p>}

      <ItemList
        items={filteredItems}
        isLoading={isLoading}
        error={error}
        onStatusChange={changeStatus}
      />
    </div>
  )
}

export default ItemsPage