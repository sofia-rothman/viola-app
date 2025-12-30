import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/"}>Todo</NavLink>
      <NavLink to={"/shop"}>Shop</NavLink>
    </nav>
  )
}

export default Navbar
