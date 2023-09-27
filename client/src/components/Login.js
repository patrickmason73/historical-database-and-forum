import React, { useState } from "react";




function Login({ setCurrentUser, currentUser }) {

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
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }

    return (
      <>
      { currentUser != null  ?
        <form onSubmit={handleSubmit}>
            <label> 
                Username
                <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label>
                Password
                <input 
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />

            <button type="submit">Login</button>
            <p>{ errors.length > 0 ? errors.map((err) => (
                <p key={err}>{err}</p>
            )) : null }</p>
        </form>
        : "You Are Already Logged In" }
        </>
    )

}


export default Login