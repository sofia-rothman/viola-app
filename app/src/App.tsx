import "./App.css"
import TaskList from "./components/Tasklist/TaskList"
import TaskInput from "./components/TaskInput/TaskInput"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import { TaskProvider } from "./context/TaskProvider"

function App() {
  return (
    <TaskProvider>
      <CelebrationModal />
      <Header />
      <div className="container">
        <TaskInput />
        <div className="wrapper">
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  )
}

export default App
