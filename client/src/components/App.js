import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import AddPost from "./AddPost";
import UserDisplay from "./UserDisplay";
import {Routes, Route } from 'react-router-dom';
import { UserContext } from "./contexts/UserContext";



function App() {

  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  const [posts, setPosts] = useState([])
  const [allComments, setAllComments] = useState([])
  const [errors, setErrors] = useState([])


  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then(setPosts)
  }, []);

  useEffect(() => {
    fetch("/comments")
    .then((res) => res.json())
    .then(setAllComments)
  }, [posts]);

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

  function addPost(title, content, imgURL) {
    fetch("/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title,
          content,
          img_url: imgURL,
      }),
  }).then((res) => {
      if (res.ok) {
          setPosts((post) => [post, ...posts])
          setErrors([])
      } else {
          res.json().then((err) => setErrors(err.errors))
      }
  })
  }

  function consoleLogButton() {
    console.log(posts)
    console.log(allComments)
    console.log(currentUser)
  }

  function addComment(newComment, postId) { 
    const postToUpdate = posts.find((post) => post.id === postId)
    fetch('/comments', {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify({
          content: newComment,
          user_id: currentUser.id,
          post_id: postId,
      }),
  })
  .then((res) => {
      if (res.ok) {
          res.json().then((data) => {
            const updatedPosts = posts.map((post) => {
              if (post === postToUpdate)
              return {
                ...postToUpdate,
                comments: [...postToUpdate.comments, data],
                users: [...postToUpdate.users, currentUser],
              }
              else {return post}
            })
            setPosts(updatedPosts)
            setErrors([])
          })

      } else {
          res.json().then((err) => setErrors(err.errors))
      }
  })

  }

  function updatedComments(newComment, postId, comment) {
    const postToUpdate = posts.find((post) => post.id === postId)
    fetch(`/comments/${comment.id}`, {
      method: "PATCH", 
      headers: {
          "Content-type" : "application/json",
      },
      body: JSON.stringify({
          content: newComment,
      }),
  })
  .then((r) => r.json())
  .then((data) => {
    const updatedPosts = posts.map((post) => {
      if (post === postToUpdate)
      return {
        ...postToUpdate,
        comments: post.comments.map((comment) => {
          if (comment.id === data.id) {
            return data;
        }
        else {
            return comment;
        }
        })
      }
      else {return post}
    })
    setPosts(updatedPosts)
  })
    
}

  function filterComment(commentDelete, postId) {
    const postToUpdate = posts.find((post) => post.id === postId)
    fetch(`/comments/${commentDelete.id}`, {
      method: "DELETE",
  }).then((res) => {
      if (res.ok) {
        const updatedPosts = posts.map((post) => {
          if (post === postToUpdate)
          return {
            ...postToUpdate,
            comments: post.comments.filter((comment) => {
              return comment.id !== commentDelete.id
            }),
            users: post.users.filter((user) => {
             const postComments = post.comments.filter((comment) => {
              return comment.id !== commentDelete.id
            })
              if (postComments.find((e) => e.user_id === user.id)) { 
                return user
              }
              else {return null}
            })
          }
          else {return post}
        })
        setPosts(updatedPosts)
        setErrors([])
      }
      else {res.json().then((err) => setErrors(err.errors))}
  })}

//   const postsDisplay = posts.map((post) => {
//     if (currentUser !== null && post.users.find(user => user.id === currentUser.id)) {
//         return post
//     } else {return null}
// })


  return (
    <div className="App">
      <button onClick={consoleLogButton}>CONSOLE LOG</button>
       <strong>{currentUser !== null && `Welcome back, ${currentUser.display_name}`}</strong>
      <Navbar logout={logout}/>
     <Routes>
      <Route path="/*" element={
        <>
      <Header posts={posts} allComments={allComments} filterComment={filterComment} updatedComments={updatedComments} addComment={addComment} errors={errors} setErrors={setErrors}/>
      </>
      }>
      </Route> 

      <Route path="/login" element={<>
       {currentUser ? <UserDisplay posts={posts} /> : <Login />}
        </>
        }>
      </Route>

      <Route path="/signup" element={<Signup />}>
      </Route>

      <Route path="/posts/new" element={(currentUser ? <AddPost addPost={addPost} errors={errors} /> : <h1>Log in or sign up to create posts!</h1>)}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
