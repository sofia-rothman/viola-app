export const storage = {
  save: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error("Error saving to LocalStorage", e)
    }
  },
  get: <T>(key: string): T | null => {
    try {
      const storedItemsJson = window.localStorage.getItem
      return storedItemsJson ? JSON.parse(storedItemsJson) : null
    } catch (e) {
      console.error("Error fetching from LocalStorage", e)
      return null
    }
  },
}
