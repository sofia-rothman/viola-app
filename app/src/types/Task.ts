export type TaskStatus = "completed" | "pending" | "approved" | 'archived' | 'notStarted'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  dueDate: Date | null
  creator: string
  assignee: string | null
  completedAt: Date | null
  approvedAt: Date | null
}

export const createTask = (rawTitle: string, status: TaskStatus = "notStarted", creator: string = "9MlHcEMMGGY1kqxwRPrgRICOVPV2", assignee: string = "9MlHcEMMGGY1kqxwRPrgRICOVPV2"): Task | null => {
  const title = rawTitle.trim()

  if (title.length < 2) {
    console.log("För få bokstäver")
    return null
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    status: status,
    dueDate: new Date(),
    creator: creator,
    assignee: assignee,
    completedAt: null,
    approvedAt: null,
  }
}
