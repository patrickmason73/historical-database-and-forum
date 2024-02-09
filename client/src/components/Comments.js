import React from "react";
import CommentDisplay from "./CommentDisplay";



const postHeaderStyle = {
    backgroundColor: "lightgray",
    display: "block",
    borderStyle: "solid",
}

const strongStyle = {
    fontSize: "150%",
    paddingTop: "12px",
    paddingLeft: "7px"
}

function Comments({ post, handleUpdatedComments, handleDeleteComment, errors, handleAddComment }) {


const displayComments = post.comments.map((comment) => {
    if (comment !== null) {
        return (
        <div key={comment.id}>
            <CommentDisplay comment={comment} errors={errors} post={post} handleDeleteComment={handleDeleteComment} handleUpdatedComments={handleUpdatedComments} handleAddComment={handleAddComment}/>
        </div>
    )} else {return null}
})

    return (
        <div key={post.id} style={{padding:"5px"}}>
        
            <div style={postHeaderStyle}>
            <strong style={strongStyle}>User Comments:</strong>
                
                <br/>
                {displayComments}
            </div>
           
        </div>
    )
}


export default Comments