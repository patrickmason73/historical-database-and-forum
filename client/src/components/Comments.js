import React, {useState} from "react";


function Comments({ comments }) {

// const [comments, setComments] = useState(post.comments)

const displayComments = comments.map((comment) => {
    return (
        <div key={comment.id}>
        <h1>{comment.user}</h1>
        <p>{comment.content}</p>
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