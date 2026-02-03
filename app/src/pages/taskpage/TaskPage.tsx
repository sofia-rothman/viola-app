import TaskInput from "../../components/parent/TaskInput/TaskInput"
import TaskList from "../../components/shared/TaskList/TaskList"
import "./TaskPage.css"

interface TaskPageProps {
  isParentView: boolean | false
}

const TaskPage = (props: TaskPageProps) => {
  const { isParentView } = props

  return (
    <div className="container">
      {isParentView && <TaskInput />}
      <div className="wrapper">
        <TaskList isParentView={isParentView} />
      </div>
    </div>
  )
}

export default TaskPage
