import "./App.css"
import { useTasks } from "./hooks/useTasks"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import TodoPage from "./pages/todopage/TodoPage"

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
      <Header points={points} level={level} title={title} goal={goal} />
      <TodoPage
        addTask={addTask}
        tasks={tasks}
        toggleStatus={toggleStatus}
        deleteTask={deleteTask}
      />
    </>
  )
}

export default App
