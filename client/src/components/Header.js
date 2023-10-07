import React from "react";

const headerStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%"
}

const secondHeaderStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "150%",
    backgroundColor: "#add8e6",
}

function Header({ posts }) {

    const displayPosts = 
        posts.map((post) => {

            return (
            <div key={post.id}>
            <h1>{post.title}</h1>
            <img src={post.img_url} alt={post.img_url}></img>
            <p>{post.content}</p>
            <br />
            </div>
        )})

    return (
        <>
        <p style={headerStyle}><strong>HISTORICAL EVENTS PROJECT</strong></p>

        <p style={secondHeaderStyle}>Login To Get Started! If You Don't Have An Account, Sign Up!</p>
        <p style={secondHeaderStyle}>Look At Posts From Other Users! You Can Also Make Your Own.</p>
        <p style={secondHeaderStyle}>Found Something Interesting? Spotted Misinfomration? Leave A Comment Below The Post With Your Thoughts.</p>
        
        
        {displayPosts}
        </>
    )
}

export default Header