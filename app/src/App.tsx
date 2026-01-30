import "./App.css"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/shared/Navbar/Navbar"
import useTaskContext from "./context/TaskContext"
import DashboardPage from "./pages/DashboardPage"
import CelebrationModal from "./components/kid/CelebrationModal/CelebrationModal"

function App() {
  const tasks = useTaskContext()
  const isGoalReached = tasks.points >= tasks.goal.current

  return (
    <div>
      {isGoalReached && <CelebrationModal />}
      <Routes>
        <Route path="*" element={<DashboardPage />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default App
