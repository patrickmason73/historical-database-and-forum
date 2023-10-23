import React, {useState} from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";

const headerStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%"
}

const imgStyle = {
    display: "block",
    width: "350px",
    height: "300px",
    paddingLeft: "10px"
}

const titleStyle = {
    fontSize: "150%",
    paddingLeft: "10px",
}

const postHeaderStyle = {
    margin: 0,
    padding: "20px",
    backgroundColor: "lightgray",
    display: "block",
}

const secondHeaderStyle = {
    display: "grid",
    backgroundColor: "#add8e6",
    padding: "20px"
}

const secondStyle = {
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

function Header({ allComments, posts, filterComment, updatedComments, addComment, errors, setErrors }) {

// const [addingComment, setAddingComment] = useState(false)

    const displayPosts = 
        posts.map((post) => {
            // const [comments, setComments] = useState(post.comments)
            
            function handleUpdatedComments(newComment, comment) {
                updatedComments(newComment, post.id, comment)
            //    const newComments = comments.map((comment) => {
            //         if (comment.id === newComment.id) {
            //             return newComment;
            //         }
            //         else {
            //             return comment;
            //         }
            //     })
            //     setComments(newComments)
            }

            function handleDeleteComment(comment) {
                filterComment(comment, post.id)
                // fetch(`/comments/${comment.id}`, {
                //     method: "DELETE",
                // }).then((res) => {
                //     if (res.ok) {
                         
                //     }
                // })
            }

            function handleAddComment(newComment) {
                addComment(newComment, post.id)
                // setComments([newComment, ...comments])
            }

                return (
                <article key={post.id} style={postHeaderStyle}>
                    <article style={secondHeaderStyle}>
                    <h1 style={titleStyle}>{post.title}</h1>
                    <img src={post.img_url} alt={post.img_url} style={imgStyle}></img>
                    <p>{post.content}</p>
                    <br />
                    <article>
                   
                    <Comments errors={errors} allComments={allComments} post={post} handleAddComment={handleAddComment} handleUpdatedComments={handleUpdatedComments} handleDeleteComment={handleDeleteComment}/>
                    </article>
                    </article>
                 </article>
            )})

    return (
        <>
        <p style={headerStyle}><strong>HISTORICAL EVENTS PROJECT</strong></p>

        <p style={secondStyle}>Login To Get Started! If You Don't Have An Account, Sign Up!</p>
        <p style={secondStyle}>Look At Posts From Other Users! You Can Also Make Your Own.</p>
        <p style={secondStyle}>Found Something Interesting? Spotted Misinfomration? Leave A Comment Below The Post With Your Thoughts.</p>
     

        <h3 style={thirdHeaderStyle}>Posts:</h3>
        
        {displayPosts}
        </>
    )
}

export default Header