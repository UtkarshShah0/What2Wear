import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MaybeShowNavbar({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    console.log(location);
    if(location.pathname === '/dashboard') {
      setShowNavbar(false);
    }
    else {
      setShowNavbar(true);
    }
  }, [location]);

  return(
    <div>
      {showNavbar && children}
    </div>
  );
}

export default MaybeShowNavbar;