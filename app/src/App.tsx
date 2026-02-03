import "./App.css"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import { Route, Routes } from "react-router-dom"
import ShopPage from "./pages/ShopPage/ShopPage"
import Navbar from "./components/Navbar/Navbar"
import useTaskContext from "./context/TaskContext"
import TaskPage from "./pages/TaskPage/TaskPage"

function App() {
  const tasks = useTaskContext()
  const isGoalReached = tasks.points >= tasks.goal.current

  return (
    <div>
      {isGoalReached && <CelebrationModal />}
      <Header />
      <Routes>
        {/* <Route path="/" element={<DashboardPage />} /> */}
        <Route path="/" element={<TaskPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default App
