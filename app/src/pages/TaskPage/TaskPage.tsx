import TaskInput from "./components/TaskInput/TaskInput"
import TaskList from "./components/TaskList/TaskList"
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
