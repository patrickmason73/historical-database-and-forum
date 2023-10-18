import React, {useContext} from "react";
import { UserContext } from "./contexts/UserContext";

const imgStyle = {
    display: "block",
    width: "300px",
    height: "250px",
    paddingLeft: "10px"
}

const headerStyle = {
    display: "grid",
    placeItems: "center",
    fontSize: "200%"
}

const postHeaderStyle = {
    paddingLeft: "10px",
    fontSize: "170%"
}

const postTitleStyle = {
    paddingLeft: "10px",
    fontSize: "150%"
}

const postContentStyle = {
    paddingLeft: "10px"
}

const articleStyle = {
    padding: "5px",
    backgroundColor: "lightgray",
    display: "block", 
}

function UserDisplay() {
    const {currentUser} = useContext(UserContext)

    const postsToDisplay = currentUser.posts.reduce((acc, current) => {
        if(!acc.find((item) => item.id === current.id)) {
            acc.push(current);
        }
        return acc;
    }, [])

    
    
    const displayPosts = postsToDisplay.map((post) => {
        const postComments = currentUser.comments.map((comment) => {
            return (
              <li key={comment.id}>
                {comment.post_id === post.id && comment.content}
                <br/>
              </li>
            )
        })
        return (
        <article key={post.id} style={articleStyle}>
            <article >
            <h1 style={postTitleStyle}>{post.title}</h1>
            <img src={post.img_url} alt={post.title} style={imgStyle}></img>
            <p style={postContentStyle}>{post.content}</p>
            <strong>Your Comments:</strong>
            <ol>
                {postComments}
            </ol>
            </article>
        </article>
        )
    })

    return (
        <div>
            <strong style={headerStyle}>Display Name: {currentUser.display_name}</strong>
            <br />
           <strong style={postHeaderStyle}> Here are the posts you have commented on:</strong>
            {displayPosts}
        </div>
    )

}



export default UserDisplay;