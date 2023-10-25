import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

const linkStyles = {
    width: "150px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "blue",
    textDecoration: "none",
    color: "white",
    alignItems: "center",
  };

  const navStyle = {
    height: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray"
  }

function Navbar({ logout }) {
    const {currentUser} = useContext(UserContext)

    return (
        <div >
            <nav style={navStyle}>
                <NavLink to="/"
               
                style={linkStyles}
                
                >
                 Home
                </NavLink>
                
                <NavLink to="/login"
               
                style={linkStyles}
               
                >
                 {currentUser ? "My Account" : "Login"}
                </NavLink>
                
                <NavLink to="/signup"
              
                style={linkStyles}
               
                >
                 Sign up
                </NavLink>
                
                <NavLink to="/posts/new"
              
              style={linkStyles}
             
              >
                Add Post
              </NavLink>

                {currentUser ? <NavLink to="/logout" onClick={logout}>
                Log Out
                </NavLink> : null}
                </nav>
        </div>
    )
}


export default Navbar