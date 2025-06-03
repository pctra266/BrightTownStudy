// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location === null ? false : location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-logo">🌟Bright Town Study🌟</div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link to="/library" className={isActive("/library") ? "active" : ""}>
            Library
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
