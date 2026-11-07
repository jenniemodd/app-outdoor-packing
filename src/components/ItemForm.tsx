import { useState, type SubmitEvent } from 'react'
import { ACTIVITIES, CATEGORIES, DURATIONS, STATUSES } from '../config'
import type { NewItem } from '../types'
import { capitalize } from '../utils/format'
import styles from './ItemForm.module.css'

type ItemFormProps = {
  onSave: (item: NewItem) => Promise<boolean>
  initialItem?: NewItem
  submitLabel?: string
}

const emptyItem: NewItem = {
  title: '',
  subtitle: '',
  category: '',
  status: 'Har',
  tags: [],
  notes: '',
}

const ItemForm = ({ onSave, initialItem = emptyItem, submitLabel = 'Lägg till pryl' }: ItemFormProps) => {
  const [title, setTitle] = useState(initialItem.title)
  const [subtitle, setSubtitle] = useState(initialItem.subtitle)
  const [category, setCategory] = useState(initialItem.category)
  const [status, setStatus] = useState(initialItem.status)
  const [tags, setTags] = useState<string[]>(initialItem.tags)
  const [notes, setNotes] = useState(initialItem.notes)

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await onSave({ title, subtitle, category, status, tags, notes })

    if (success) {
      setTitle(initialItem.title)
      setSubtitle(initialItem.subtitle)
      setCategory(initialItem.category)
      setStatus(initialItem.status)
      setTags(initialItem.tags)
      setNotes(initialItem.notes)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Namn</span>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Märke, modell, vikt</span>
          <input
            className={styles.input}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Kategori</span>
          <input
            className={styles.input}
            list="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <datalist id="categories">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Aktiviteter</legend>
        <div className={styles.chips}>
          {ACTIVITIES.map((tag) => (
            <label key={tag} className={styles.chip}>
              <input
                type="checkbox"
                className={styles.chipInput}
                checked={tags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {capitalize(tag)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Turlängd</legend>
        <div className={styles.chips}>
          {DURATIONS.map((tag) => (
            <label key={tag} className={styles.chip}>
              <input
                type="checkbox"
                className={styles.chipInput}
                checked={tags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {capitalize(tag)}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={styles.label}>Anteckningar</span>
        {/* Två klasser på samma element: .input för grundstilen, .textarea för det extra */}
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <button type="submit" className={styles.submit}>{submitLabel}</button>
    </form>
  )
}

export default ItemForm