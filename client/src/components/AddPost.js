import React, { useState } from "react";



function AddPost({ posts, setPosts }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imgURL, setImgURL] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                img_url: imgURL,
            }),
        }).then((res) => {
            if (res.ok) {
                setPosts((post) => [...posts, post])
            }
        })
    }


    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title
                        <input 
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Content: 
                        <br />
                        Write About A Significant Historical Event Or Person. Be Sure To Cite Your Sources.
                        <textarea 
                        rows="12"
                        cols="80"
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Include An Image URL Here
                        <input 
                        type="text"
                        id="imgURL"
                        value={imgURL}
                        onChange={(e) => setImgURL(e.target.value)}
                        />
                    </label>
                </form>
        </div>
    )
}


export default AddPost;