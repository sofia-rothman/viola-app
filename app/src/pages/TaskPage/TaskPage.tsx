import TaskInput from "./components/TaskInput/TaskInput"
import TaskList from "./components/TaskList/TaskList"
import "./TaskPage.css"

const TaskPage = () => {
  return (
    <div className="task-page-container">
      <TaskInput />
      <div className="task-list-wrapper">
        <TaskList />
      </div>
    </div>
  )
}

export default TaskPage
