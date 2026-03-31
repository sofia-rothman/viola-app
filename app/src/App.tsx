import "./App.css"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import { Route, Routes } from "react-router-dom"
import ShopPage from "./pages/ShopPage/ShopPage"
import Navbar from "./components/Navbar/Navbar"
import useTaskContext from "./context/TaskContext"
import TaskPage from "./pages/TaskPage/TaskPage"
//import DashboardPage from "./pages/DashboardPage"
import useAccountContext from "./context/AccountContext"

function App() {
  const tasks = useTaskContext()
  const {account, loading} = useAccountContext()
  const isGoalReached = tasks.points >= tasks.goal.current

  if (loading) return <div className="loader">Hämtar profil...</div>;
  return (
    <>
    <div className="app-wrapper">
      {isGoalReached && <CelebrationModal />}
       <Header />
       {account &&
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
