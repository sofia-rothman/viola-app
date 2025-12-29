import { NavLink } from "react-router-dom"
import "./NavigationBar.css"

interface NavigationBarProps {
  setOnPage: React.Dispatch<React.SetStateAction<string>>
}

const NavigationBar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <NavLink to="/">Todo</NavLink> | <NavLink to="/shop">Game shop</NavLink>{" "}
        |{" "}
      </nav>
    </div>
  )
}

export default NavigationBar
