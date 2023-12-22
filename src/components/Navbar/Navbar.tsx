import RestaurantIcon from "@mui/icons-material/Restaurant";
import "./Navbar.css";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [currentUser,setCurrentUser] = useState(localStorage.getItem("currentUser"))

  function handleClick() {
    setClicked(!clicked);
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser(null)
  }

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"))
    
  }, [localStorage.getItem("currentUser")]);


  const commonMenuItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
    },
    {
      title: "Browse Menu",
      url: "/menu",
      cName: "nav-links",
    },
  ];

  const menuItems = [
    ...commonMenuItems,
    {
      title: "VR Tour",
      url: "https://my.matterport.com/show/?m=1qee4XETZpP",
      cName: "nav-links",
    },
  ];

  const loggedInMenuItems = [
    ...commonMenuItems,
    {
      title: "VR Tour",
      url: "https://my.matterport.com/show/?m=1qee4XETZpP",
      cName: "nav-links",
    },
    {
      title: "Book a Table",
      url: "/book",
      cName: "nav-links",
    },
    {
      title: "Profile",
      url: "/profile",
      cName: "nav-links",
    },
    {
      title: "Log Out",
      url: "/login",
      cName: "nav-links-mobile",
    },
  ];

  return (
    <nav className="navbarItems">
      <h1 className="navbar-logo">
        ARMS <RestaurantIcon />{" "}
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        {clicked ? (
          <CloseIcon style={{ color: "white" }} />
        ) : (
          <MenuIcon style={{ color: "white" }}>
            <CloseIcon />
          </MenuIcon>
        )}
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {localStorage.getItem("currentUser") == null
          ? menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={item.cName}
                target={item.url.startsWith("http") ? "_blank" : ""}
              >
                {item.title}
              </Link>
            ))
          : loggedInMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={item.cName}
                target={item.url.startsWith("http") ? "_blank" : ""}
              >
                {item.title}
              </Link>
            ))}
      </ul>

      {localStorage.getItem("currentUser") != null ? (
        <Link to="/login">
          <button
            onClick={handleLogout}
            className="nav-button btn btn--primary "
          >
            Log Out
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="nav-button btn btn--primary ">Log In</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
