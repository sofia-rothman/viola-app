import TaskItem from "../TaskItem/TaskItem"
import deleteIcon from "../../assets/delete-226.svg"
import "./TaskList.css"
import type { Task } from "../../types/Task"

interface TaskListProps {
  tasks: Task[]
  toggleStatus: (taskId: string) => void
  deleteTask: (taskId: string) => void
}

const TaskList = (props: TaskListProps) => {
  const { tasks, toggleStatus, deleteTask } = props

  const compareFn = (a: Task, b: Task) => {
    if (a.completed > b.completed) {
      return 1
    } else if (a.completed < b.completed) {
      return -1
    } else return 0
  }

  tasks.sort((a, b) => compareFn(a, b))

  return (
    <div className="list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`list-item ${task.completed ? "completed" : ""}`}
        >
          <TaskItem task={task} toggleStatus={toggleStatus} />
          <div className="button-container">
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              <img src={deleteIcon} alt="Radera" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
