// Shelf API. Docs: https://shelf-api-mu.vercel.app/docs
// Mitt handle "jennie-packlista" gör att mina prylar sparas separat från alla andras
export const API_URL = 'https://shelf-api-mu.vercel.app/api/jennie-packlista/items'

// Statusarna är hårdkodade: de används till filterknapparna
export const STATUSES = ['Att skaffa', 'Har', 'Packad']

// Grundkategorierna. Nya kan läggas till via formuläret senare
export const CATEGORIES = [
  'Kläder',
  'Mat',
  'Sova & boende',
  'Säkerhetsutrustning',
  'Övrig utrustning',
]

// Taggar: alltid små bokstäver och utan mellanslag
export const ACTIVITIES = ['vandring', 'turskidåkning', 'topptur', 'längdskidåkning']
export const DURATIONS = ['dagstur', 'flerdagstur']