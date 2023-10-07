import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import AddPost from "./AddPost";
import {Routes, Route } from 'react-router-dom';


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
        setCurrentUser(user)
        console.log(user)
      })}
    })
  }, [])

  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then(setPosts)
  }, []);

  // const {id, username, displayName, bio, imgURL} = currentUser

  return (
    <div className="App">
      <button onClick={console.log(posts)}>CONSOLE LOG</button>
       {/* {currentUser != null && `Welcome ${displayName}`}  */}
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
     <Routes>
      <Route path="/*" element={
        <>
      <Header posts={posts} />
      </>
      }>
      </Route> 

      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />}>
      </Route>

      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />}>
      </Route>

      <Route path="/posts/index" element={<AddPost posts={posts} setPosts={setPosts} />}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
