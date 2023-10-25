import React from "react";
import CommentDisplay from "./CommentDisplay";



const postHeaderStyle = {
    backgroundColor: "lightgray",
    display: "block",
    borderStyle: "solid",
}

const strongStyle = {
    fontSize: "150%"
}

function Comments({ post, handleUpdatedComments, handleDeleteComment, errors }) {


const displayComments = post.comments.map((comment) => {
    if (comment !== null) {
        return (
        <div key={comment.id}>
            <CommentDisplay comment={comment} errors={errors} post={post} handleDeleteComment={handleDeleteComment} handleUpdatedComments={handleUpdatedComments}/>
        </div>
    )} else {return null}
})

    return (
        <div key={post.id}>
            <div style={postHeaderStyle}>
           
                <strong style={strongStyle}>User Comments:</strong>
                {displayComments}
            </div>
           
        </div>
    )
}


export default Comments