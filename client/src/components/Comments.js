import React, {useState} from "react";


function Comments({ comments, post, filterComment, currentUser, setComments }) {

// const [comments, setComments] = useState(post.comments)


function handleDeleteComment(comment) {
    fetch(`/comments/${comment.id}`, {
        method: "DELETE",
    }).then((res) => {
        if (res.ok) {
            filterComment(comment.id, post.id)
            const newComments = comments.filter((item) => {return item.id ==! comment.id})
            setComments(newComments)
        }
        else {
        const message = res.json()
        return (
            <p>{message.errors}</p>
        )
        }
    })}
    // filterComment(comment.id, post.id)
    // const newComments = comments.filter((item) => {return item.id ==! comment.id})
    // setComments(newComments)


function consoleLog(comment) {
    console.log(comment)
}

const displayComments = comments.map((comment) => {
 const commentUser = post.users.find((user) => user.id === comment.user_id)
    return (
        <div key={comment.id}>
        <h3>{commentUser ? commentUser.display_name : "Error.... Refresh Page"}</h3>
            <p>{comment.content}</p>
            <button onClick={() => handleDeleteComment(comment)}>Delete Comment</button>
            <button onClick={() => consoleLog(commentUser)}>console.log</button>
        </div>
    )
})

    return (
        <div>
            {displayComments}
        </div>
    )
}


export default Comments