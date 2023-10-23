import React, {useState, useContext} from "react";
import { UserContext } from "./contexts/UserContext";

function AddComment({ handleAddComment, errors}) {
    const {currentUser} = useContext(UserContext)
    const [newComment, setNewComment] = useState("")


function handleSubmit(e) {
    e.preventDefault()
    handleAddComment(newComment)
    console.log(newComment)
    setNewComment("")
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
                <ul>{errors && errors.map((err) => (
                         <li key={err}>{err}</li>
                     ))}</ul>
            </form> : <strong>Login To Comment On Posts!</strong>}
        </div>
    )
}

export default AddComment;