export interface Task {
  id: string
  title: string
  completed: boolean
  isApproved: boolean
}

export const createTask = (rawTitle: string): Task | null => {
  const title = rawTitle.trim()

  if (title.length < 2) {
    console.log("För få bokstäver")
    return null
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    isApproved: false,
  }
}
