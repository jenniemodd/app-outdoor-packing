// "vandring" → "Vandring"
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

// "2026-09-14" → "14 sep. 2026"
export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })