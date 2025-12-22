import EmptyState from "../../components/EmptyState/EmptyState"
import TaskInput from "../../components/TaskInput/TaskInput"
import TaskList from "../../components/Tasklist/TaskList"
import type { Task } from "../../types/Task"
import "./TodoPage.css"

interface TodoPageProps {
  addTask: (title: string) => void
  tasks: Task[]
  toggleStatus: (taskId: string) => void
  deleteTask: (taskId: string) => void
}
const TodoPage = (props: TodoPageProps) => {
  const { addTask, tasks, toggleStatus, deleteTask } = props

  return (
    <div className="container">
      <TaskInput saveInput={addTask} />
      <div>
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default TodoPage
