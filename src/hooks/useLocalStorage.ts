import { useEffect, useState } from 'react'

// Fungerar som useState, men värdet sparas i webbläsarens localStorage
// och finns kvar när sidan laddas om.
// key = namnet värdet sparas under, initialValue = värdet om inget är sparat än
const useLocalStorage = <T>(key: string, initialValue: T) => {
  // 1. Startvärde: finns något sparat används det, annars initialValue.
  //    Funktionen körs bara första gången komponenten visas
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue // trasigt sparat värde: börja om
    }
  })

  // 2. Varje gång värdet ändras sparas det
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage kan vara blockerat, t.ex. i privat läge. Appen fungerar ändå
    }
  }, [key, value])

  // 3. Lämna tillbaka samma sak som useState: [värdet, funktionen som ändrar det]
  return [value, setValue] as const
}

export default useLocalStorage