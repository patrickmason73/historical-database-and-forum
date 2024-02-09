import React from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";

const headerStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%",
    backgroundColor: 'lightgray'
}

const imgStyle = {
    display: "block",
    width: "350px",
    height: "300px",
    paddingLeft: "10px"
}

const titleStyle = {
    fontSize: "150%",
    paddingLeft: "10px",
}

const postHeaderStyle = {
    margin: 0,
    padding: "20px",
    backgroundColor: "lightgray",
    display: "block",
}

const secondHeaderStyle = {
    display: "grid",
    backgroundColor: "#add8e6",
    padding: "20px"
}

const secondStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "150%",
    backgroundColor: "#add8e6",
}

const thirdHeaderStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%",
    paddingLeft: "5px",
}

function Header({ posts, filterComment, updatedComments, addComment, errors }) {


    const displayPosts = 
        posts.map((post) => {
            
            function handleUpdatedComments(newComment, comment) {
                updatedComments(newComment, post.id, comment)
            }

            function handleDeleteComment(comment) {
                filterComment(comment, post.id)
            }

            function handleAddComment(newComment, postId, parentId) {
                addComment(newComment, postId, parentId)
            }

                return (
                <article style={postHeaderStyle} key={post.id}>
                    <article style={secondHeaderStyle} >
                    <h1 style={titleStyle}>{post.title}</h1>
                    <img src={post.img_url} alt={post.img_url} style={imgStyle}></img>
                    <p>{post.content}</p>
                    <br />
                    <AddComment post={post} handleAddComment={handleAddComment} errors={errors} />
                    <br/>
                    {post.comments ? <Comments errors={errors} post={post} handleUpdatedComments={handleUpdatedComments} handleDeleteComment={handleDeleteComment} handleAddComment={handleAddComment}/> : null}
                    </article>
                 </article>
            )})

    return (
        <>
        <p style={headerStyle}><strong>HISTORICAL EVENTS AND PEOPLE DATABASE</strong></p>

        {/* <p style={secondStyle}>This Website Is A Place Where Anyone Can Post About Any Person Or Event From History That They Found Interesting Or Significant</p> */}
        {/* <p style={secondStyle}>Login To Get Create Posts Or Comment! If You Don't Have An Account, Sign Up!</p>
        <p style={secondStyle}>Found Something Interesting? Spotted Misinfomration? Leave A Comment Below The Post With Your Thoughts.</p> */}
     

        <h1 style={thirdHeaderStyle}>User Posts:</h1>
        
        {displayPosts}
        </>
    )
}

export default Header