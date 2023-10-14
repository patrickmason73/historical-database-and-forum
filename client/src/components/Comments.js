import React from "react";
import CommentDisplay from "./CommentDisplay";


function Comments({ comments, post, currentUser, handleUpdatedComments, handleDeleteComment }) {









const displayComments = comments.map((comment) => {
 const commentUser = post.users.find((user) => user.id === comment.user_id)
    return (
        <div key={comment.id}>
            <CommentDisplay comment={comment} commentUser={commentUser} currentUser={currentUser} handleDeleteComment={handleDeleteComment} handleUpdatedComments={handleUpdatedComments}/>
        </div>
    )
})

    return (
        <div key={post.id}>
            {displayComments}
        </div>
    )
}


export default Comments