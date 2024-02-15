import React, {useState, useContext} from "react";
import { UserContext } from "./contexts/UserContext";
import ReplyDisplay from "./ReplyDisplay";

// const postHeaderStyle = {
//     padding: "12px",
//     backgroundColor: "lightgray",
//     display: "block",
//     borderStyle: "groove",
// }

function CommentDisplay({ comment, handleDeleteComment, handleUpdatedComments, post, handleAddComment, depth = 0 }) {


 const {currentUser} = useContext(UserContext)
 const [replying, setReplying] = useState(false)
 const [editing, setEditing] = useState(false)
 const [newComment, setNewComment] = useState(comment.content)
 const [replyComment, setReplyComment] = useState("")
 const [errors, setErrors] = useState([])

 const commentUser = post.users.find((user) => {if (user !== null) {return (user.id === comment.user_id)} else {return null}})

 function handleSubmit(e, comment, setErrors) {
    e.preventDefault();
    handleUpdatedComments(newComment, post, comment, setErrors);
    setEditing(false);
}

const handleReplySubmit = (e) => {
    e.preventDefault();
    const parentId = comment.id
    handleAddComment(replyComment, post.id, parentId, setErrors, setReplying);
    setReplyComment("")
}

    return (
        <div style={{marginLeft: depth * 20}}>
            {commentUser !== null && comment.parent_comment_id === null &&
            <article style={{marginLeft: depth * 20, padding: "12px", backgroundColor: 'lightgray', display: 'block', borderStyle: 'groove'}}>
            <h1>{commentUser.display_name}<img src={commentUser.img_url} alt="pfp" style={{float: "left", height: "21px", width: "21px"}}/></h1>
                    
                    <p style={{float: "bottom", fontSize: '110%'}}>{comment.content}</p>
            
                    {currentUser !== null ? <button onClick={() => setReplying(current => !current)}>{replying ? "Cancel" : "Reply"}</button> : <b>Log in to Reply to Comments</b>} 
                        {replying && (
                            <form onSubmit={handleReplySubmit} style={{ display: "flex", alignItems: "center" }}>
                                <textarea
                                    rows="3"
                                    cols="70"
                                    value={replyComment}
                                    onChange={(e) => setReplyComment(e.target.value)}
                                />
                                <button type="submit" style={{marginLeft: '10px'}}>Submit Reply</button>
                                <ul>{errors && errors.map((err) => (
                                    <li key={err}>{err}</li>
                                ))}</ul>
                            </form>
                        )}
                    {(currentUser !== null && currentUser.id === commentUser.id) && <button onClick={() => handleDeleteComment(comment, post, setErrors)}>Delete Comment</button>}
                    {(currentUser !== null && currentUser.id === commentUser.id) && <button onClick={() => setEditing(current => !current)}>{editing ? "Cancel" : "Edit Comment"}</button>}
                   
                    {editing ? 
                    <form onSubmit={(e) => handleSubmit(e, comment, setErrors)}>
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
                            <ul>{errors && errors.map((err) => (
                                <li key={err}>{err}</li>
                            ))}</ul>
                    </form>
                        : null}
            
            {comment.replies && comment.replies.length > 0 && comment.parent_comment_id === null && (<h2 style={{marginLeft: "10px"}}>Replies:</h2>)}
            <ul>
            {comment.replies && comment.replies.map(reply => {
                const replyWithReplies = { ...reply, replies: [] };
                return (
                <ReplyDisplay
                    key={reply.id}
                    comment={replyWithReplies}
                    handleDeleteComment={handleDeleteComment}
                    handleUpdatedComments={handleUpdatedComments}
                    handleAddComment={handleAddComment}
                    post={post}
                    depth={depth + 1}
                />
            )})}
            </ul>
            </article>
            }
        </div>
    )

}


export default CommentDisplay;