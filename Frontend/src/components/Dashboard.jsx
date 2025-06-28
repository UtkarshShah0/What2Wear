import { useEffect, useState } from "react";
import Collections from "./Collections";
import ImageCard from "./ImageCard";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import What2Wear from "./What2Wear";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Collections");
  const [loggedUser, setLoggedUser] = useState(""); // Initialize loggedUser state
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here
  
    // Navigate to the home route
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://what2wear-backend.vercel.app/hello", {
        withCredentials: true,
      });
      // setLoggedUser(response.data);
      const email = response.data;
      const username = email.split("@")[0];
      setLoggedUser(username);
    };

    fetchData();
  }, []);

  const handleMenuItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Collections":
        return <Collections />;
      case "UploadImage":
        return <UploadImage />;
      case "SelectCategory":
        return <SelectCategory />;
      default:
        return null;
    }
  };

  return (
    <div className="Dashboard">
      <nav className="navbar-dashboard">
        <div className="Branding">
          <div id="logo">
            <img src="./Logo.svg" alt="Company logo" />
          </div>
          <div id="AppName">What2Wear</div>
        </div>
        <div className="logged-user">
          <div id="user-img" onClick={() => setShowDropdown(!showDropdown)}>
            <img src="./user-img.png" alt="User logo" />
            {showDropdown && (
              <div id="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          <h3 id="username">{loggedUser}</h3>
        </div>
      </nav>
      <div className="body-dashboard">
        <div className="side-menu">
          <div className="menu-item">
            <ul>
              <li>
                <a
                  href="#"
                  className={activeComponent === "Collections" ? "active" : ""}
                  onClick={() => handleMenuItemClick("Collections")}
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "UploadImage" ? "active" : ""}
                  onClick={() => handleMenuItemClick("UploadImage")}
                >
                  Upload Image
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={
                    activeComponent === "SelectCategory" ? "active" : ""
                  }
                  onClick={() => handleMenuItemClick("SelectCategory")}
                >
                  What2Wear
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-dashboard">
          {renderComponent()}
          {/* <Collections /> */}
          {/* <UploadImage /> */}
          {/* <ImageCard 
						img={"./black-formals.jpg"} 
						desc={"Black Party Formals"}
						tag={"Formal"}
						color={"Black"}
					/> */}
          {/* <SelectCategory /> */}
          {/* <What2Wear /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
