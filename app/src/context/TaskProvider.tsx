import { useTasks } from "../hooks/useTasks"
import { TaskContext } from "./TaskContext"

interface TaskProviderProps {
  children: React.ReactNode
}

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
    tasks: tasks,
    addTask: addTask,
    toggleStatus: toggleStatus,
    deleteTask: deleteTask,
    archiveTask: archiveTask,
    points: points,
    clearTasks: clearTasks,
    title: title || 'Titel', 
    level: level,
    goal: goal,
    purchaseItem: purchaseItem,
    purchase: purchase,
    isLoading: isLoading,
    showCelebration: showCelebration, 
    setShowCelebration: setShowCelebration,
  }

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}
