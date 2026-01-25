import { useLocation } from "react-router-dom"
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import TaskPage from "../pages/TaskPage/TaskPage"
import ShopPage from "../pages/ShopPage/ShopPage"

const KidsView = () => {
  const nav = useLocation()
  console.log("params: " + nav.pathname)

  return (
    <div>
      <Header />
      <ShopPage />
      <Navbar />
    </div>
  )
}

export default KidsView
