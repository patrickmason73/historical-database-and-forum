import React from 'react';
import { NavLink } from 'react-router-dom';

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
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

function Navbar({ setCurrentUser, currentUser }) {

  function logout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setCurrentUser(null)
        console.log(res)
      }
    })
  }


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
                 Login
                </NavLink>
                
                <NavLink to="/signup"
              
                style={linkStyles}
               
                >
                 Sign up
                </NavLink>
                
                <NavLink to="/posts/index"
              
              style={linkStyles}
             
              >
                Posts
              </NavLink>

                <NavLink to="/logout" onClick={logout}>
                Log Out
                </NavLink>
                </nav>
        </div>
    )
}


export default Navbar