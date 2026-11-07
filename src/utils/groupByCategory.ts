import { CATEGORIES } from '../config'
import type { Item } from '../types'

// Delar upp prylarna i grupper efter kategori.
// Ger tillbaka en lista med par: [kategorinamn, prylarna i den kategorin]
export const groupByCategory = (items: Item[]) => {
  // Ett objekt där varje nyckel är en kategori och värdet är en lista med prylar
  // Record<string, Item[]> betyder: "nycklar är text, värden är listor med prylar"
  const groups: Record<string, Item[]> = {}

  for (const item of items) {
    const category = item.category || 'Utan kategori' // tom kategori får ett eget namn

    if (!groups[category]) {
      groups[category] = [] // ingen låda för kategorin än? Skapa en tom
    }
    groups[category].push(item) // lägg prylen i lådan
  }

  // Grundkategorierna i config.ts kommer först, i den ordningen.
  // Egna kategorier hamnar efteråt, i bokstavsordning
  const position = (name: string) => {
    const index = CATEGORIES.indexOf(name)
    return index === -1 ? CATEGORIES.length : index
  }

  return Object.entries(groups).sort(
    ([a], [b]) => position(a) - position(b) || a.localeCompare(b, 'sv')
  )
}