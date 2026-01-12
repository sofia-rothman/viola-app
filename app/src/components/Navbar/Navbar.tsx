import { NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/"} className="nav-item">
        <span className="nav-icon">📋</span>
        Uppgifter
      </NavLink>

      <NavLink to={"/shop"} className="nav-item">
        <span className="nav-icon">🛍️</span>
        Butik
      </NavLink>
    </div>
  )
}

export default Navbar
