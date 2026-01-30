import TaskInput from "../../components/parent/TaskInput/TaskInput"
import TaskList from "../../components/shared/TaskList/TaskList"
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
