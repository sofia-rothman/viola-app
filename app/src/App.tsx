import "./App.css"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import { Route, Routes } from "react-router-dom"
import ShopPage from "./pages/ShopPage/ShopPage"
import Navbar from "./components/Navbar/Navbar"
import useTaskContext from "./context/TaskContext"
import TaskPage from "./pages/TaskPage/TaskPage"
//import DashboardPage from "./pages/DashboardPage"
import { useAuth } from "./hooks/useAuth"

function App() {
  const tasks = useTaskContext()
  const {user, loading} = useAuth()
  const isGoalReached = tasks.points >= tasks.goal.current

  if (loading) return <div className="loader">Hämtar profil...</div>;
  return (
    <>
    <div className="app-wrapper">
      {isGoalReached && <CelebrationModal />}
       <Header />
       {user &&
        <Routes>
        {/*  <Route path="/" element={<DashboardPage />} /> */}
          <Route path="/" element={<TaskPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes> 
       }
    </div>
      <Navbar />
    </>
  )
}

export default App
