import { Link } from 'react-router-dom';

function Navbar({ activeComponent, setActiveComponent }) {
  return (
    <nav className='Navbar'>
      <div className='Branding'>
        <div id='logo'><img src="./Logo.svg" alt="Company logo" /></div>
        <div id='AppName'>What2Wear</div>
      </div>
      <div className='MenuOptions'>
        <Link to="/">
          <button className={activeComponent === "hero" ? "active" : ""}>
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className={activeComponent === "about" ? "active" : ""}>
            About
          </button>
        </Link>
        <Link to="/login">
          <button className={activeComponent === "login" ? "active" : ""}>
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
