import React, { useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";



function Login() {
    const {setCurrentUser, currentUser} = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user)
            console.log(user)
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }

    return (
      <>
      { currentUser === null ?
        <form onSubmit={handleSubmit} style={{padding: "10px", marginLeft: '20px'}}>
            <label style={{margin: '5px'}}> 
                <b>Username: </b>
                <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label style={{margin: '5px'}}>
               <b> Password: </b>
                <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />

            <button type="submit" style={{ width: "100px", padding: "5px", margin: "10px 6px 6px", background: "blue", color: "white", display: "block", marginBottom: '30px', cursor: 'pointer'}}>Login</button>
            <ul>{errors.map((err) => (
                <li key={err}>{err}</li>
            ))}</ul>
        </form>
        : null }
        </>
    )

}


export default Login