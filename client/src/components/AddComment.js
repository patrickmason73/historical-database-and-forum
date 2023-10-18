import React, {useState, useContext} from "react";
import { UserContext } from "./contexts/UserContext";

function AddComment({ post, comments, setComments}) {
    const {currentUser} = useContext(UserContext)
    const [newComment, setNewComment] = useState("")
    

function handleAddComment(comment) {
    setComments([comment, ...comments])
}

function handleSubmit(e) {
    e.preventDefault()
    fetch('/comments', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            content: newComment,
            user_id: currentUser.id,
            post_id: post.id,
        }),
    })
    .then(res => res.json())
    .then((data) => {
        handleAddComment(data)
        setNewComment("")
    })
}
    

    return (
        <div>
            {currentUser ?
            <form onSubmit={handleSubmit}>
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
                <button type="submit">POST COMMENT</button>
            </form> : <strong>Login To Comment On Posts!</strong>}
        </div>
    )
}

export default AddComment;