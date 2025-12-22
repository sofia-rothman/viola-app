import "./App.css"
import TaskList from "./components/Tasklist/TaskList"
import TaskInput from "./components/TaskInput/TaskInput"
import { useTasks } from "./hooks/useTasks"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import EmptyState from "./components/EmptyState/EmptyState"

function App() {
  const {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    points,
    clearTasks,
    title,
    level,
    goal,
  } = useTasks()

  return (
    <>
      {points >= goal.current && <CelebrationModal clearTasks={clearTasks} />}
      <Header
        points={points}
        tasks={tasks}
        level={level}
        title={title}
        goal={goal}
      />
      <div className="container">
        <TaskInput saveInput={addTask} />
        <div className="wrapper">
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              toggleStatus={toggleStatus}
              deleteTask={deleteTask}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  )
}

export default App
