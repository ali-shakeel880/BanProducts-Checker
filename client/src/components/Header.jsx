import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../AuthContext"; // Import AuthContext

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { isLoggedIn, logout } = useContext(AuthContext); // Access isLoggedIn and logout
  const navigate = useNavigate();

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsNavShowing(true);
      } else {
        setIsNavShowing(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/" onClick={closeNavHandler}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/productpage" onClick={closeNavHandler}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/donate-now" onClick={closeNavHandler}>
                Donate Now
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeNavHandler}>
                Contact Us
              </Link>
            </li>
         
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
