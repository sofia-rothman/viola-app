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
    points,
    clearTasks,
    title,
    level,
    goal,
    purchaseItem,
    purchase,
    totalXP,
    balance,
  } = useTasks()

  const values = {
    tasks: tasks,
    addTask: addTask,
    toggleStatus: toggleStatus,
    deleteTask: deleteTask,
    points: points,
    clearTasks: clearTasks,
    title: title,
    level: level,
    goal: goal,
    purchaseItem: purchaseItem,
    purchase: purchase,
    totalXP: totalXP,
    balance: balance,
  }

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}
