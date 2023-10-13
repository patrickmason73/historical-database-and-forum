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
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    fetch("/users")
    .then((res) => res.json())
    .then(setUsers)
  }, []);

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
       {/* {currentUser != null && `Welcome ${displayName}`}  */}
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
     <Routes>
      <Route path="/*" element={
        <>
      <Header posts={posts} currentUser={currentUser} filterComment={filterComment}/>
      </>
      }>
      </Route> 

      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />}>
      </Route>

      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />}>
      </Route>

      <Route path="/posts/new" element={<AddPost posts={posts} setPosts={setPosts} />}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
