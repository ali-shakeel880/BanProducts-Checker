import React, { useContext } from "react";
import { BsJustify, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";// Import the AuthContext

function Header({ OpenSidebar }) {
  const { logout } = useContext(AuthContext); // Get the logout function from AuthContext

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
      <div></div>
      </div>
      <div className="header-right">
        <Link 
          to="/login" 
          title="Logout" 
          onClick={logout} 
          className="px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" 
          role="button"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}

export default Header;
