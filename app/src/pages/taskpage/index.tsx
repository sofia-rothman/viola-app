import TaskInput from "./TaskInput/TaskInput"
import TaskList from "./Tasklist/TaskList"
import "./TaskPage.css"

const TaskPage = () => {
  return (
    <div className="container">
      <TaskInput />
      <div className="wrapper">
        <TaskList />
      </div>
    </div>
  )
}

export default TaskPage
