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
    display: "block",
    marginBottom: '40px',
    marginTop: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '130%'
  };

  const navStyle = {
    position: "fixed", 
    top: 0,
    left: 0, 
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: "10px",
    borderStyle: 'groove',
    marginRight: '5px'
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
                
                {currentUser ? null : <NavLink to="/signup"
              
                style={linkStyles}
               
                >
                 Sign up
                </NavLink>}
                
                <NavLink to="/posts/new"
              
              style={linkStyles}
             
              >
                Add Post
              </NavLink>

                {currentUser ? <NavLink to="/logout" onClick={logout} style={{fontSize: '110%', fontWeight: 'bold'}}>
                Log Out
                </NavLink> : null}
                </nav>
        </div>
    )
}


export default Navbar