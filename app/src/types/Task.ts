/** Supported lifecycle states for a task card. */
export type TaskStatus = "completed" | "pending" | "approved" | "archived" | "notStarted"

const DEFAULT_TASK_OWNER_ID = "9MlHcEMMGGY1kqxwRPrgRICOVPV2"

/** A chore assigned to a child and tracked through completion and approval. */
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

/**
 * Creates a valid task from user input.
 *
 * The default owner keeps manually created tasks usable before an authenticated user overwrites it.
 */
export const createTask = (
  rawTitle: string,
  status: TaskStatus = "notStarted",
  creator: string = DEFAULT_TASK_OWNER_ID,
  assignee: string = DEFAULT_TASK_OWNER_ID,
): Task | null => {
  const title = rawTitle.trim()

  if (title.length < 2) {
    console.log("För få bokstäver")
    return null
  }

  return {
    id: crypto.randomUUID(),
    title,
    status,
    dueDate: new Date(),
    creator,
    assignee,
    completedAt: null,
    approvedAt: null,
  }
}
