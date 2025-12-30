import TaskInput from "../../components/TaskInput/TaskInput"
import TaskList from "../../components/Tasklist/TaskList"

const TodoPage = () => {
  return (
    <div className="container">
      <TaskInput />
      <div className="wrapper">
        <TaskList />
      </div>
    </div>
  )
}

export default TodoPage
