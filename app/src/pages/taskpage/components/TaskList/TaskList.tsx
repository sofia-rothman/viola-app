import TaskItem from "../TaskItem/TaskItem"
import deleteIcon from "../../../../assets/delete-226.svg"
import "./TaskList.css"
import useTaskContext from "../../../../context/TaskContext"
import type { Task } from "../../../../types/Task"
import EmptyState from "../../../../components/EmptyState/EmptyState"

const TaskList = () => {
  const taskContext = useTaskContext()

  const compareFn = (a: Task, b: Task) => {
    if (a.completed > b.completed) {
      return 1
    } else if (a.completed < b.completed) {
      return -1
    } else return 0
  }

  const sortedTasks = taskContext.tasks.sort((a, b) => compareFn(a, b))

  if (taskContext.tasks.length > 0) {
    return (
      <div className="list">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`list-item ${task.completed && "completed"}`}
          >
            <TaskItem task={task} toggleStatus={taskContext.toggleStatus} />
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => taskContext.deleteTask(task.id)}
              >
                <img src={deleteIcon} alt="Radera" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  } else return <EmptyState />
}

export default TaskList
