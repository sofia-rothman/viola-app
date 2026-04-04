import type { Task } from "../../../../types/Task"
import "./TaskItem.css"
import useTaskContext from "../../../../context/TaskContext"

interface TaskProps {
  task: Task
}

const TaskItem = (props: TaskProps) => {
  const { task } = props
  const taskContext = useTaskContext()

  const handleToggleStatus = () => {
    taskContext.toggleStatus(task.id)
  }

  const archiveTask = () => {
    taskContext.archiveTask(task.id)
  }

  return (
    <div className="task-card">
      <>{task.title}</>
      <div>
        <button
          className={`status-button ${
            task.status === "completed" ? "completed" : "pending"
          }`}
          onClick={handleToggleStatus}
        >
          {task.status === "completed" ? "Ångra" : "Markera som klar"}
        </button>
      </div>
      {task.status === "completed" && 
        <button
          className={`status-button ${
            task.status === "completed" ? "completed" : "pending"
          }`}
          onClick={archiveTask}
        >
          Godkänn
        </button>
      }
    </div>
  )
}

export default TaskItem
