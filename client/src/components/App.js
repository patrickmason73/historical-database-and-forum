import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import {Routes, Route } from 'react-router-dom';


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {setCurrentUser(user)
        console.log(user)})
      }
    })
  }, [])

  // const {id, username, displayName, bio, imgURL} = currentUser

  return (
    <div className="App">
       {/* {currentUser != null && `Welcome ${displayName}`}  */}
      <Navbar />
     <Routes>
      <Route path="/*" element={
        <>
      <Header />
      </>
      }>
      </Route>

      <Route path="/login" element={ loggingIn == true && <Login setCurrentUser={setCurrentUser} setLoggingIn={setLoggingIn} /> }>
      </Route>

      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
