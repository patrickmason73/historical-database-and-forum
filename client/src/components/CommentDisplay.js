import React, {useState} from "react";

function CommentDisplay({ comment, commentUser, currentUser, handleDeleteComment, handleUpdatedComments }) {

 const [editing, setEditing] = useState(false)
 const [newComment, setNewComment] = useState(comment.content)

 function handleSubmit(e, comment) {
    e.preventDefault();
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
        handleUpdatedComments(data);
        setEditing(false);
    })
}

function consoleLog(comment) {
    console.log(comment)
}

    return (
        <div>
            <h3>{commentUser ? commentUser.display_name : currentUser.display_name}</h3>
                     <p>{comment.content}</p>
                    { currentUser.id === commentUser.id ? <button onClick={() => handleDeleteComment(comment)}>Delete Comment</button> : null}
                    { currentUser.id === commentUser.id ? <button onClick={() => setEditing(current => !current)}>{editing ? "Cancel" : "Edit Comment"}</button> : null}
                    {editing ? 
                    <form onSubmit={(e) => handleSubmit(e, comment)}>
                            <label>
                                <h4>Comment:</h4>
                                <textarea 
                                    rows="10"
                                    cols="70"
                                    type="text"
                                    id="newComment"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </label>
                            <br/>
                            <button type="submit">UPDATE COMMENT</button>
                    </form>
                        : null}
            <button onClick={() => consoleLog(comment)}>console.log</button>
        </div>
    )

}


export default CommentDisplay;