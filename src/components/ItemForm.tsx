import { useState, type SubmitEvent } from 'react'
import { ACTIVITIES, CATEGORIES, DURATIONS, STATUSES } from '../config'
import type { NewItem } from '../types'

type ItemFormProps = {
  onSave: (item: NewItem) => Promise<boolean> // sidan bestämmer vad som händer
  initialItem?: NewItem // ? = valfri. Används senare för att förifylla vid ändra
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
  // Ett state per fält: formuläret är "kontrollerat", React vet alltid vad som står
  const [title, setTitle] = useState(initialItem.title)
  const [subtitle, setSubtitle] = useState(initialItem.subtitle)
  const [category, setCategory] = useState(initialItem.category)
  const [status, setStatus] = useState(initialItem.status)
  const [tags, setTags] = useState<string[]>(initialItem.tags)
  const [notes, setNotes] = useState(initialItem.notes)

  // Kryssar du i en tagg läggs den till, kryssar du ur tas den bort
  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)) // behåll alla UTOM den här
    } else {
      setTags([...tags, tag]) // en ny lista: de gamla + den nya
    }
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault() // stoppa webbläsaren från att ladda om sidan
    await onSave({ title, subtitle, category, status, tags, notes })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Namn
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Märke, modell, vikt
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </label>

      <label>
        Kategori
        {/* list kopplar fältet till förslagen i <datalist>. Du kan välja ett eller skriva ett nytt */}
        <input list="categories" value={category} onChange={(e) => setCategory(e.target.value)} />
        <datalist id="categories">
          {CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      {/* fieldset och legend grupperar kryssrutorna med en rubrik */}
      <fieldset>
        <legend>Aktiviteter</legend>
        {ACTIVITIES.map((tag) => (
          <label key={tag}>
            <input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} />
            {tag}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Turlängd</legend>
        {DURATIONS.map((tag) => (
          <label key={tag}>
            <input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} />
            {tag}
          </label>
        ))}
      </fieldset>

      <label>
        Anteckningar
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <button type="submit">{submitLabel}</button>
    </form>
  )
}

export default ItemForm