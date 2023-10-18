import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import AddPost from "./AddPost";
import {Routes, Route } from 'react-router-dom';
import { UserContext } from "./contexts/UserContext";



function App() {

  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])



  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then(setPosts)
  }, []);

  useEffect(() => {
    fetch("/users")
    .then((res) => res.json())
    .then(setUsers)
  }, []);

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

  // const {id, username, displayName, bio, imgURL} = currentUser

  function consoleLogButton() {
    console.log(posts)
    console.log(users)
    console.log(currentUser)
  }

  function filterComment(commentId, postId) {
    const postToUpdate = posts.find((post) => post.id === postId)
    const updatedPosts = posts.map((post) => {
      if (post === postToUpdate)
      return {
        ...postToUpdate,
        comments: post.comments.filter((comment) => {
          return comment.id !== commentId
        })
      }
      else {return post}
    })
    setPosts(updatedPosts)
}

  return (
    <div className="App">
      <button onClick={consoleLogButton}>CONSOLE LOG</button>
       <strong>{currentUser !== null && `Welcome back, ${currentUser.display_name}`}</strong>
      <Navbar logout={logout}/>
     <Routes>
      <Route path="/*" element={
        <>
      <Header posts={posts} filterComment={filterComment}/>
      </>
      }>
      </Route> 

      <Route path="/login" element={<Login />}>
      </Route>

      <Route path="/signup" element={<Signup />}>
      </Route>

      <Route path="/posts/new" element={<AddPost posts={posts} setPosts={setPosts} />}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
