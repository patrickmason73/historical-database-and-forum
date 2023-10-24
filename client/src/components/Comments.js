import React, { useContext } from "react";
import CommentDisplay from "./CommentDisplay";
import { UserContext } from "./contexts/UserContext";
import AddComment from "./AddComment";

const postHeaderStyle = {
    backgroundColor: "lightgray",
    display: "block",
    borderStyle: "solid",
}

const strongStyle = {
    fontSize: "150%"
}

function Comments({ post, handleUpdatedComments, handleDeleteComment, errors }) {
    const {currentUser} = useContext(UserContext)

const displayComments = post.comments.map((comment) => {
    if (comment !== null) {
        return (
        <div key={comment.id}>
            {/* <button onClick={() => console.log(comment)}>consolelog comment</button> */}
            <CommentDisplay comment={comment} errors={errors} post={post} handleDeleteComment={handleDeleteComment} handleUpdatedComments={handleUpdatedComments}/>
        </div>
    )} else {return null}
})

    return (
        <div key={post.id}>
            <div style={postHeaderStyle}>
           
                <strong style={strongStyle}>User Comments:</strong>
                {/* <button onClick={() => console.log(post.comments)}>consoleLog</button> */}
                {displayComments}
            </div>
           
        </div>
    )
}


export default Comments