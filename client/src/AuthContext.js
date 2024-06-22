import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state

  const logout = () => {
    // Implement logout logic here (e.g., clear tokens, user data)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
