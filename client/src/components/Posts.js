import React, { useState } from "react";



function Posts() {
    const [addingPost, setAddingPost] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
    }


    return (
        <div>
            {addingPost ? 
                <form onSubmit={handleSubmit}>
                    <label>
                        Title
                        <input>
                        </input>
                    </label>
                </form> : null
            }
        </div>
    )
}


export default Posts;