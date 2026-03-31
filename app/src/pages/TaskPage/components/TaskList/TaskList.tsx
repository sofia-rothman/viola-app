import TaskItem from "../TaskItem/TaskItem"
import deleteIcon from "../../../../assets/delete-226.svg"
import "./TaskList.css"
import useTaskContext from "../../../../context/TaskContext"
import EmptyState from "../../../../components/EmptyState/EmptyState"

const TaskList = () => {
  const taskContext = useTaskContext()

  const sortedTasks = taskContext?.tasks?.sort((a, b) => a.status === "completed" ? 1 : -1)

  if (taskContext?.tasks?.length > 0) {
    return (
      <div className="list">
        {sortedTasks?.map((task) => (
          <div
            key={task.id}
            className={`list-item ${task.status === "completed" && "completed"}`}
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
