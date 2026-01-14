import { createContext, useContext } from "react"
import type { Task } from "../types/Task"
import type { PurchasedReward, Reward } from "../types/Reward"

interface TaskContextValue {
  tasks: Task[]
  addTask: (title: string) => void
  toggleStatus: (taskId: string) => void
  deleteTask: (taskId: string) => void
  points: number
  clearTasks: () => void
  level: number
  title: string
  goal: React.RefObject<number>
  purchaseItem: (item: Reward) => false | undefined
  purchasedItems: PurchasedReward[]
  totalXP: number
  balance: number
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined
)

export default function useTaskContext() {
  const tasks = useContext(TaskContext)

  if (tasks === undefined) {
    throw new Error("useTaskContext must be used with TaskContext")
  }

  return tasks
}
