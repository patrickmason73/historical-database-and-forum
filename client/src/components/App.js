import React from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import {Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user))
      }
    })
  }, [])

  return (
    <div className="App">
     <Routes>
      <Route path="/*" element={
        <>
      <Navbar />
      <Header />
      </>
      }>

      </Route>
     </Routes>
    </div>
  );
}

export default App;
