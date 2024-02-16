import React, {useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const linkStyles = {
  width: "150px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "linear-gradient(to right, rgb(78, 84, 200), rgb(118 123 239))", 
  textDecoration: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'background-color 0.3s ease', 
  marginBottom: '20px'
};

const navStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  borderStyle: 'groove',
  marginRight: '5px',
  borderRight: '1px solid #ccc', // Add a border on the right for separation
  background: 'linear-gradient(to bottom, rgb(245, 245, 245), hsl(194.74deg 53.27% 79.02%))',
}

function Navbar({ logout }) {
    const {currentUser} = useContext(UserContext)
    const location = useLocation();

    const isActive = (path) => {
      return location.pathname === path ? "active-link" : "";
    };
  

    return (
        <div >
            <nav style={navStyle}>
            <NavLink to="/" style={linkStyles} className={isActive("/")} >
          <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
          Home
        </NavLink>

        <NavLink to="/login" style={linkStyles} className={isActive("/login")}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
          {currentUser ? "My Account" : "Login"}
        </NavLink>

        {!currentUser &&
          <NavLink to="/signup" style={linkStyles} className={isActive("/signup")}>
            <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '8px' }} />
            Sign up
          </NavLink>
        }

        <NavLink to="/posts/new" style={linkStyles} className={isActive("/posts/new")}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Add Post
        </NavLink>

        {currentUser &&
          <NavLink to="/logout" onClick={logout} style={linkStyles}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
            Log Out
          </NavLink>
        }
                </nav>
        </div>
    )
}


export default Navbar