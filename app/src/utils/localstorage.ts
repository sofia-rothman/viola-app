/** JSON localStorage wrapper that keeps repository code small and failure-tolerant. */
export const storage = {
  /** Serializes and stores a typed value. */
  save: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error("Error saving to LocalStorage", e)
    }
  },
  /** Reads and parses a typed value, returning null when storage is empty or unavailable. */
  get: <T>(key: string): T | null => {
    try {
      const storedItemsJson = window.localStorage.getItem(key)
      return storedItemsJson ? JSON.parse(storedItemsJson) : null
    } catch (e) {
      console.error("Error fetching from LocalStorage", e)
      return null
    }
  },
}
