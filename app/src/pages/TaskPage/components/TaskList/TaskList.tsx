import TaskItem from "../TaskItem/TaskItem"
import deleteIcon from "../../../../assets/delete-226.svg"
import "./TaskList.css"
import useTaskContext from "../../../../context/TaskContext"
import EmptyState from "../../../../components/EmptyState/EmptyState"

const TaskList = () => {
  const taskContext = useTaskContext()

  const archivedTasks = taskContext?.tasks?.filter((task) => task.status === "archived")
  const completedTasks = taskContext?.tasks?.filter((task) => task.status === "completed")
  const pendingTasks = taskContext?.tasks?.filter((task) => task.status === "pending" || task.status === "notStarted")

  if (taskContext?.tasks?.length > 0) {
    return (
      <div>
        <div className="list">
          {pendingTasks?.map((task) => (
            <div
              key={task.id}
              className={`list-item ${task.status === "completed" && "completed"}`}
            >
              <TaskItem task={task} />
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
          {completedTasks?.map((task) => (
            <div key={task.id}
              className={`list-item ${task.status === "completed" && "completed"}`}
            >
              <TaskItem task={task} />
            </div>
          ))}
        </div>
        <div>
          ARKIVET
          {archivedTasks?.map((task) => (
            <div key={task.id}
              className={`archived-item`}
            >
              <TaskItem task={task} />
              {task.completedAt && <p>task completed at </p>}
              {task.approvedAt && <p>task approved at </p>}
            </div>
          )
          )}
        </div>
      </div>
    )
  } else return <EmptyState />
}

export default TaskList
