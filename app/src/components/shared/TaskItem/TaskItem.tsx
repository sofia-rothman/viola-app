import type { Task } from "../../../types/Task"
import "./TaskItem.css"

interface TaskProps {
  task: Task
  toggleStatus: (taskId: string) => void
  isParentView: boolean | false
  toggleApproved: (taskId: string) => void
}

const TaskItem = (props: TaskProps) => {
  const { task, toggleStatus, isParentView, toggleApproved } = props

  return (
    <div className="task-card">
      <>{task.title}</>
      <div>
        {isParentView && task.completed && (
          <button
            className={`status-button ${
              task.completed ? "completed" : "pending"
            }`}
            onClick={() => toggleApproved(task.id)}
          >
            Godkänn
          </button>
        )}
      </div>
      <button
        className={`status-button ${task.completed ? "completed" : "pending"}`}
        onClick={() => toggleStatus(task.id)}
      >
        {task.completed ? "Ångra" : "Markera som klar"}
      </button>
    </div>
  )
}

export default TaskItem
