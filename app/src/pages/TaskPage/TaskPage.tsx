import useAccountContext from "../../context/AccountContext"
import TaskInput from "./components/TaskInput/TaskInput"
import TaskList from "./components/TaskList/TaskList"
import "./TaskPage.css"

  const TaskPage = () => {
  const { account, loading: isLoadingAccount } = useAccountContext()

  if(account) return (
    <div className="task-page-container">
      <TaskInput />
      <div className="task-list-wrapper">
        <TaskList />
      </div>
    </div>
  )
}

export default TaskPage
