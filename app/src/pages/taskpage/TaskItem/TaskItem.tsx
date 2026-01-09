import type { Task } from "../../../types/Task"
import "./TaskItem.css"

interface TaskProps {
  task: Task
  toggleStatus: (taskId: string) => void
}

const TaskItem = (props: TaskProps) => {
  const { task, toggleStatus } = props

  return (
    <div className="task-card">
      <>{task.title}</>
      <div>
        <button
          className="confirm-button"
          onClick={() => toggleStatus(task.id)}
        >
          {task.completed ? "Klar" : "Pågående"}
        </button>
      </div>
    </div>
  )
}

export default TaskItem
