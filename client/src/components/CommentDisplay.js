import React, {useState, useContext} from "react";
import { UserContext } from "./contexts/UserContext";

const postHeaderStyle = {
    padding: "20px",
    backgroundColor: "lightgray",
    display: "block",
    borderStyle: "solid",
}

function CommentDisplay({ comment, handleDeleteComment, handleUpdatedComments, post }) {


 const {currentUser} = useContext(UserContext)

 const [editing, setEditing] = useState(false)
 const [newComment, setNewComment] = useState(comment.content)

//   const commentUser = post.users.includes((user) => user.id === comment.user_id)
    
    // const currentComment = allComments.find((e) => e.id === comment.id)
    const commentUser = post.users.find((user) => {if (user !== null) {return (user.id === comment.user_id)} else {return null}})

 function handleSubmit(e, comment) {
    e.preventDefault();
    handleUpdatedComments(newComment, comment);
    setEditing(false);
}

    return (
        <div>
            {commentUser !== null ? 
            <article style={postHeaderStyle}>
            <h3>{commentUser.display_name}</h3>
                    <p>{comment.content}</p>
            
           
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
            {/* <button onClick={() => consoleLog(comment)}>console.log</button> */}
            </article>
            : null}
        </div>
    )

}


export default CommentDisplay;