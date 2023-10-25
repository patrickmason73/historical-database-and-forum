import React, { useState } from "react";



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
                <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
                    <label>
                        <h2>Title:
                        <input 
                        type="text"
                        id="title"
                        style={{height:"35px", width: "500px" ,fontSize: "14pt"}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        </h2>
                    </label>
                    <br />
                    <label>
                        <h2>Content:
                        <p style={{fontSize:"75%"}}>Write About A Significant Historical Event Or Person. Be Sure To Cite Your Sources.</p>
                        <textarea 
                        rows="12"
                        cols="80"
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                        </h2>
                       
                    </label>
                    <br />
                    <label>
                        Include An Image URL Here
                        <input 
                        type="text"
                        id="imgURL"
                        style={{width: "500px" ,fontSize: "10pt"}}
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