import { Link, useNavigate, useParams } from 'react-router'
import type { NewItem } from '../types'
import useItem from '../hooks/useItem'
import useItemActions from '../hooks/useItemActions'
import ItemForm from '../components/ItemForm'

const EditItemPage = () => {
  // 1. Hooks
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, isLoading, error } = useItem(id)
  // Båda hooks lämnar tillbaka något som heter "error", så vi döper om det ena
  const { updateItem, error: saveError } = useItemActions()

  // 2. Funktioner
  const editItem = async (changes: NewItem) => {
    if (!id) return false

    const updated = await updateItem(id, changes)
    if (!updated) return false

    navigate(`/items/${updated.id}`)
    return true
  }

  // 3. Tidiga return
  if (isLoading) return <p>Laddar pryl...</p>

  if (error || !item) {
    return (
      <>
        <h1>{error || 'Prylen hittades inte'}</h1>
        <Link to="/">Tillbaka till packlistan</Link>
      </>
    )
  }

  // 4. Själva sidan
  return (
    <>
      <h1>Ändra {item.title}</h1>
      {saveError && <p>Kunde inte spara: {saveError}</p>}

      <ItemForm
        onSave={editItem}
        initialItem={{
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          status: item.status,
          tags: item.tags,
          notes: item.notes,
        }}
        submitLabel="Spara ändringar"
      />
    </>
  )
}

export default EditItemPage