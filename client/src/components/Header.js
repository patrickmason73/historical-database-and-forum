import React, {useState} from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";

const headerStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%"
}

const postHeaderStyle = {
    margin: 0,
    padding: "5px",
    backgroundColor: "lightgray",
    display: "block",
}

const secondHeaderStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "150%",
    backgroundColor: "#add8e6",
}

const thirdHeaderStyle = {
    display: "grid",
    placeItems: "start",
    fontSize: "175%",
    paddingLeft: "5px"
}

function Header({ posts, filterComment }) {

// const [addingComment, setAddingComment] = useState(false)

    const displayPosts = 
        posts.map((post) => {
            const [comments, setComments] = useState(post.comments)
            function handleUpdatedComments(newComment) {
                const editedComments = comments.map((comment) => {
                    if (comment.id === newComment.id) {
                        return newComment;
                    }
                    else {
                        return comment;
                    }
                })
                setComments(editedComments)
            }
            function handleDeleteComment(comment) {
                fetch(`/comments/${comment.id}`, {
                    method: "DELETE",
                }).then((res) => {
                    if (res.ok) {
                       filterComment(comment.id, post.id)
                         const newComments = comments.filter((item) => {return item.id !== comment.id})
                         setComments(newComments)
                    }
                })}
                return (
                <article key={post.id} style={postHeaderStyle}>
                    <article style={secondHeaderStyle}>
                    <h1>{post.title}</h1>
                    <img src={post.img_url} alt={post.img_url}></img>
                    <p>{post.content}</p>
                    {/* <button onClick={setAddingComment(true)}>Add Comment</button> */}
                    <AddComment post={post} setComments={setComments} comments={comments}/>
                    <br />
                    <Comments comments={comments} post={post} filterComment={filterComment} setComments={setComments} handleUpdatedComments={handleUpdatedComments} handleDeleteComment={handleDeleteComment}/>
                    </article>
                 </article>
            )})

    return (
        <>
        <p style={headerStyle}><strong>HISTORICAL EVENTS PROJECT</strong></p>

        <p style={secondHeaderStyle}>Login To Get Started! If You Don't Have An Account, Sign Up!</p>
        <p style={secondHeaderStyle}>Look At Posts From Other Users! You Can Also Make Your Own.</p>
        <p style={secondHeaderStyle}>Found Something Interesting? Spotted Misinfomration? Leave A Comment Below The Post With Your Thoughts.</p>
     

        <h3 style={thirdHeaderStyle}>Posts:</h3>
        
        {displayPosts}
        </>
    )
}

export default Header