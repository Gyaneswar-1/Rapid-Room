import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/"  className="active text-yellow-200">Home</NavLink>
        <NavLink to="/login" className="active text-yellow-200">Login</NavLink>
        <NavLink to="/register" className="active text-yellow-200">Register</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;