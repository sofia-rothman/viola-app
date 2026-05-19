import { useTasks } from "../hooks/useTasks"
import { TaskContext } from "./TaskContext"

interface TaskProviderProps {
  children: React.ReactNode
}

/** Provides task, progress, and shop state to feature pages. */
export const TaskProvider = (props: TaskProviderProps) => {
  const { children } = props
  const {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    archiveTask,
    points,
    clearTasks,
    title,
    level,
    goal,
    purchaseItem,
    purchase,
    isLoading,
    showCelebration,
    setShowCelebration,
  } = useTasks()

  const values = {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    archiveTask,
    points,
    clearTasks,
    title: title || "Titel",
    level,
    goal,
    purchaseItem,
    purchase,
    isLoading,
    showCelebration,
    setShowCelebration,
  }

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}
