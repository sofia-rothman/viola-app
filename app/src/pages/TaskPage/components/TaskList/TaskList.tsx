import TaskItem from "../TaskItem/TaskItem"
import deleteIcon from "../../../../assets/delete-226.svg"
import "./TaskList.css"
import useTaskContext from "../../../../context/TaskContext"
import EmptyState from "../../../../components/EmptyState/EmptyState"

const TaskList = () => {
  const taskContext = useTaskContext()

  const archivedTasks = taskContext?.tasks?.filter((task) => task.status === "archived")
  const completedTasks = taskContext?.tasks?.filter((task) => task.status === "completed")
  const inProgressTasks = taskContext?.tasks?.filter((task) => task.status === "inProgress")

  const sortedTasks = [...(taskContext?.tasks ?? [])].sort((a, b) => {
    if (a.status === b.status) return 0
    return a.status === "completed" ? 1 : -1
  })

  if (taskContext?.tasks?.length > 0) {
    return (
      <div className="list">
        {inProgressTasks?.map((task) => (
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
          <div key={task.id}>
            <TaskItem task={task} />
          </div>
        ))}
        {archivedTasks?.map((task) => (
            <div key={task.id}>
              <TaskItem task={task} />
            </div>
          )
        )} 
      </div>
    )
  } else return <EmptyState />
}

export default TaskList
