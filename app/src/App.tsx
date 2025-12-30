import "./App.css"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import { TaskProvider } from "./context/TaskProvider"
import TodoPage from "./pages/todopage"
import { Route, Routes } from "react-router-dom"
import ShopPage from "./pages/shoppage"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <TaskProvider>
      <CelebrationModal />
      <Header />
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <Navbar />
    </TaskProvider>
  )
}

export default App
