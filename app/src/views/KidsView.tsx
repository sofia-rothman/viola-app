import { useLocation } from "react-router-dom"
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import ShopPage from "../pages/ShopPage/ShopPage"

/** Child-facing shell used by the experimental dashboard view. */
const KidsView = () => {
  const location = useLocation()
  console.log("params: " + location.pathname)

  return (
    <div>
      <Header />
      <ShopPage />
      <Navbar />
    </div>
  )
}

export default KidsView
