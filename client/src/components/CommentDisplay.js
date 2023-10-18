import React, {useState, useContext} from "react";
import { UserContext } from "./contexts/UserContext";

function CommentDisplay({ comment, commentUser, handleDeleteComment, handleUpdatedComments }) {

 const {currentUser} = useContext(UserContext)

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
                    <p>{comment ? comment.content : null}</p>
           
                    {(currentUser !== null && currentUser.id === commentUser.id) && <button onClick={() => handleDeleteComment(comment)}>Delete Comment</button>}
                    {(currentUser !== null && currentUser.id === commentUser.id) && <button onClick={() => setEditing(current => !current)}>{editing ? "Cancel" : "Edit Comment"}</button>}
                   
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