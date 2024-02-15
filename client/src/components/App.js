import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar"
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import AddPost from "./AddPost";
import UserDisplay from "./UserDisplay";
import {Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from "./contexts/UserContext";



function App() {

  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([])


  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then(setPosts)
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

  function addPost(title, content, imgURL, setErrors) {
    fetch("/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title,
          content,
          img_url: imgURL,
          comments: [],
          users: [],
      }),
  }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPosts([data, ...posts])
          setErrors([])
          navigate("/")
        })
      } else {
          res.json().then((err) => setErrors(err.errors))
      }
  })
  }

  function handleSignUp(username, password, passwordConfirmation, displayName, imgURL, bio, setErrors) {
    
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
            display_name: displayName,
            img_url: imgURL,
            bio,
        }),
    }).then((res) => {
        if (res.ok) {
            res.json().then((user) => {
              setCurrentUser(user)
              setErrors([])
              navigate("/")
            })
        } else {
            res.json().then((err) => setErrors(err.errors))
        }
    })
  }

  function addComment(newComment, postId, parentId, setErrors) { 
    const postToUpdate = posts.find((post) => post.id === postId)
    fetch(`/comments`, {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify({
          content: newComment,
          user_id: currentUser.id,
          post_id: postId,
          parent_comment_id: parentId,
          replies: [],
      }),
  })
  .then((res) => {
      if (res.ok) {
          res.json().then((data) => {
            const updatedPosts = posts.map((post) => {
              if (post === postToUpdate) {
                // If the new comment is a parent comment, append it to the comments array
                if (!parentId) {
                  return {
                    ...postToUpdate,
                    comments: [...postToUpdate.comments, data],
                    users: [...postToUpdate.users, currentUser],
                  };
                }
                return {
                  ...postToUpdate,
                  comments: postToUpdate.comments.map((comment) => {
                    if (comment.id === parentId) {
                      return {
                        ...comment,
                        replies: [...comment.replies, data],
                      };
                    }
                    if (comment.replies && comment.replies.length > 0) {
                      return {
                          ...comment,
                          replies: comment.replies.map((reply) => {
                              if (comment.id === reply.parent_comment_id) {
                                  return {
                                      ...reply,
                                      replies:(reply.replies || []).concat(data),
                                  };
                              }
                              return reply;
                          }),
                      };
                  }
                    return comment;
                  }),
                };
              }
              return post;
            });
            setPosts(updatedPosts);
            setErrors([]);
            // setReplying(false)
          });
        } else {
          res.json().then((err) => setErrors(err.errors));
        }
      });
    }

  function updatedComments(newComment, postId, comment, setErrors) {
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
  // .then((r) => r.json())
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
    const updatedPosts = posts.map((post) => {
      if (post === postToUpdate) {
        return {
          ...postToUpdate,
          comments: post.comments.map((c) => {
            if (c.id === data.id) {
              return data;
            } else if (c.replies && c.replies.length > 0) {
              return {
                ...c,
                replies: c.replies.map((reply) => {
                  if (reply.id === data.id) {
                    return data;
                  }
                  return reply;
                }),
              };
            }
            return c;
          }),
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setErrors([]);
  })
  }
  else {
    res.json().then((err) => setErrors(err.errors));
  }
  });
}

  function filterComment(commentDelete, postId, setErrors) {
    const postToUpdate = posts.find((post) => post.id === postId)
    fetch(`/comments/${commentDelete.id}`, {
      method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      const updatedPosts = posts.map((post) => {
        if (post === postToUpdate) {
          const updatedComments = post.comments.filter((comment) => {
            // Exclude the deleted comment and its replies
            if (comment.id === commentDelete.id || comment.parent_comment_id === commentDelete.id) {
              return false;
            }
            // Filter out replies of the comment being deleted
            if (comment.replies) {
              comment.replies = comment.replies.filter((reply) => reply.id !== commentDelete.id);
            }
            return true;
          });
          // Filter out the deleted comment's user from the users array
          const updatedUsers = post.users.filter((user) => {
            const hasComments = updatedComments.some(
              (comment) => comment.user_id === user.id
            );
            return hasComments || user.id === commentDelete.user_id;
          });

          return {
            ...postToUpdate,
            comments: updatedComments,
            users: updatedUsers,
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setErrors([]);
    } else {
      res.json().then((err) => setErrors(err.errors));
    }
  }).catch(error => {
    console.error('Error deleting comment:', error);
    // Handle error (e.g., show error message to user)
  });
}


  return (
    <div style={{paddingLeft: '200px', position: 'absolute'}}>
       <strong style={{fontSize:"150%", marginLeft: '20px'}}>{currentUser !== null && `Welcome back, ${currentUser.display_name}`}</strong>
       <button onClick={() => console.log(posts)}>console</button>
      <Navbar logout={logout}/>
     <Routes>
      <Route path="/*" element={
        <>
      <Header posts={posts} filterComment={filterComment} updatedComments={updatedComments} addComment={addComment} />
      </>
      }>
      </Route> 

      <Route path="/login" element={<>
       {currentUser ? <UserDisplay posts={posts} /> : <Login />}
        </>
        }>
      </Route>

      <Route path="/signup" element={<Signup handleSignUp={handleSignUp}/>}>
      </Route>

      <Route path="/posts/new" element={(currentUser ? <AddPost addPost={addPost} /> : <h1 style={{marginLeft: '20px'}}>Log In Or Sign Up To Create Posts!</h1>)}>
      </Route>

     </Routes>
    </div>
  );
}

export default App;
