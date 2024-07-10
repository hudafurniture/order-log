import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { ModeToggle } from "../DarkModeToggle";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSignout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ModeToggle />
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul dir="rtl">
            <li>
              <NavLink to="/data">הזמנות</NavLink>
            </li>
            <li>
              <NavLink to="/history">היסטוריה</NavLink>
            </li>
            <li>
              <NavLink to="/stats">סטטיסטיקה</NavLink>
            </li>
            <li
              onClick={handleSignout}
              className="hover:cursor-pointer px-6 mx-8 logout-btn"
            >
              יציאה
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);
