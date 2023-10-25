import React, { useState } from "react";

const formStyle = {
    textAlign: "center"
}

const labelOneStyle = {
    height:"35px", width: "500px" ,fontSize: "14pt"
}

const labelTwoStyle = {
    width: "500px" ,fontSize: "10pt"
}

function AddPost({ addPost, errors }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imgURL, setImgURL] = useState("")
    

    function handleSubmit(e) {
        e.preventDefault();
        addPost(title, content, imgURL)
    }


    return (
        <div>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <label>
                        <h2>Title:
                        <input 
                        type="text"
                        id="title"
                        style={labelOneStyle}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        </h2>
                    </label>
                    <br />
                    <label>
                        <h3>Content:
                        <p>Write About A Significant Historical Event Or Person. Be Sure To Cite Your Sources.</p>
                        <textarea 
                        rows="12"
                        cols="80"
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                        </h3>
                       
                    </label>
                    <br />
                    <label>
                        Include An Image URL Here
                        <input 
                        type="text"
                        id="imgURL"
                        style={labelTwoStyle}
                        value={imgURL}
                        onChange={(e) => setImgURL(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <button type="submit">CREATE POST</button>
                    <ul>{errors && errors.map((err) => (
                         <li key={err}>{err}</li>
                     ))}</ul>
                </form>
        </div>
    )
}


export default AddPost;