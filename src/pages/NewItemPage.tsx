import { useNavigate } from 'react-router'
import type { NewItem } from '../types'
import useItemActions from '../hooks/useItemActions'
import ItemForm from '../components/ItemForm'

const NewItemPage = () => {
  const navigate = useNavigate()
  const { createItem, error } = useItemActions()

  // Sidan bestämmer bara vad som händer EFTER att det sparats
  const addItem = async (newItem: NewItem) => {
    const created = await createItem(newItem)
    if (!created) return false // felet visas via error

    navigate(`/items/${created.id}`)
    return true
  }

  return (
    <>
      <h1>Lägg till pryl</h1>
      {error && <p>Kunde inte spara: {error}</p>}
      <ItemForm onSave={addItem} />
    </>
  )
}

export default NewItemPage