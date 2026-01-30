import { Route, Routes } from "react-router-dom"
import Header from "../components/shared/Header/Header"
import TaskPage from "../pages/TaskPage/TaskPage"
import ShopPage from "../pages/ShopPage/ShopPage"

const KidsView = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </div>
  )
}

export default KidsView
