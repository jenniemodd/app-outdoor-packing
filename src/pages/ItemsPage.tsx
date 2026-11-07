import { ACTIVITIES, CATEGORIES, DURATIONS, STATUSES } from '../config'
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
  const [category, setCategory] = useLocalStorage('packlista-category', '')

  const { items, isLoading, error, updateError, updateStatus, reload } = useItems(status)
  const { items: allItems, reload: reloadAll } = useItems('')
  const { createItem, error: createError } = useItemActions()

  // 2. Filtrera
  const matchesFilters = (item: Item) =>
    (activity === '' || item.tags.includes(activity)) &&
    (duration === '' || item.tags.includes(duration)) &&
    (category === '' || item.category === category)

  const filteredItems = items.filter(matchesFilters)
  const tripItems = allItems.filter(matchesFilters)

  // Knapparna för kategori: grundlistan + egna kategorier som finns på prylarna
  const categories = [
    ...new Set([...CATEGORIES, ...allItems.map((item) => item.category).filter((c) => c !== '')]),
  ]

  // Det som visas i den hopfällda filterraden, t.ex. "Vandring · Flerdagstur"
  const activeFilters = [activity, duration, category, status]
    .filter((value) => value !== '')
    .map(capitalize)
  const hasFilters = activeFilters.length > 0

  // Förloppet
  const packedCount = tripItems.filter((item) => item.status === 'Packad').length
  const toBuyCount = tripItems.filter((item) => item.status === 'Att skaffa').length
  const percent = tripItems.length > 0 ? (packedCount / tripItems.length) * 100 : 0

  // Rubriken
  const tripParts = [activity, duration, category.toLowerCase()].filter((part) => part !== '')
  const tripTitle = tripParts.length > 0 ? capitalize(tripParts.join(', ')) : 'Alla prylar'

  // 3. Funktioner
  const addItem = async (newItem: NewItem) => {
    const created = await createItem(newItem)
    if (!created) return false

    reload()
    reloadAll()
    return true
  }

  const changeStatus = async (item: Item, newStatus: string) => {
    if (newStatus === item.status) return
    await updateStatus(item.id, newStatus)
    reloadAll()
  }

  // Nollställer alla filter på en gång
  const clearFilters = () => {
    setActivity('')
    setDuration('')
    setCategory('')
    setStatus('')
  }

  // 4. Själva sidan
  return (
    <div className={styles.page}>
      {/* Överst: vad du packar för och hur långt du kommit */}
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
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressBar} style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </section>

      {/* Filterpanelen: hopfälld, visar valda filter i rubriken */}
      <details className={styles.filterPanel}>
        <summary className={styles.filterSummary}>
          <span className={styles.filterLabel}>Filtrering</span>
          <span className={styles.filterValue}>
            {hasFilters ? activeFilters.join(' · ') : 'Visa allt'}
          </span>
        </summary>

        <div className={styles.filterContent}>
          <FilterButtons label="Aktivitet" options={ACTIVITIES} selected={activity} onChange={setActivity} />
          <FilterButtons label="Turlängd" options={DURATIONS} selected={duration} onChange={setDuration} />
          <FilterButtons label="Kategori" options={categories} selected={category} onChange={setCategory} />
          <FilterButtons label="Status" options={STATUSES} selected={status} onChange={setStatus} />

          {hasFilters && (
            <button type="button" className={styles.clearButton} onClick={clearFilters}>
              Rensa filter
            </button>
          )}
        </div>
      </details>

      {/* Packlistan: egen rubrik, så den syns som en egen del */}
      <section className={styles.listSection} aria-labelledby="list-heading">
        <div className={styles.listHeader}>
          <h2 id="list-heading" className={styles.listTitle}>Packlista</h2>
          <span className={styles.listCount}>{filteredItems.length} prylar</span>
        </div>

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
      </section>
    </div>
  )
}

export default ItemsPage