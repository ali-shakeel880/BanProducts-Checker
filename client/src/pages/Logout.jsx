import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext

const Logout = () => {
  const { logout } = useContext(AuthContext); // Access logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate); // Call logout function with navigate for redirection
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
