import { NavLink } from "react-router-dom"
import TaskIcon from "../../assets/task-list.svg?react"
import ShopIcon from "../../assets/shopping-bag.svg?react"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/"} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="task-icon">
          <TaskIcon />
        </div>
        Uppgifter
      </NavLink>

      <NavLink to={"/shop"} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="shop-icon">
         <ShopIcon />
        </div>
        Butik
      </NavLink>
    </div>
  )
}

export default Navbar
