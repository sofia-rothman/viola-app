import { Route, Routes } from "react-router-dom"
import Header from "../components/shared/Header/Header"
import Navbar from "../components/shared/Navbar/Navbar"
import ShopPage from "../pages/ShopPage/ShopPage"
import TaskPage from "../pages/TaskPage/TaskPage"

const ParentView = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<TaskPage isParentView={true} />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default ParentView
