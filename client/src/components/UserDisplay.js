import React, {useContext} from "react";
import { UserContext } from "./contexts/UserContext";

const imgStyle = {
    display: "block",
    width: "300px",
    height: "300px",
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

function UserDisplay({ posts }) {
    const {currentUser} = useContext(UserContext)

    const postsDisplay = posts.map((post) => {
        if (post.users.find(user => user.id === currentUser.id)) {
            return post
        } else {return null}
    })


    
    
    const displayPosts = postsDisplay.map((post) => {
        if (post !== null) {
        const postComments = post.comments.map((comment) => {
            if (comment.user_id === currentUser.id) {
            return (
              <li key={comment.id}>
                <p>{comment.post_id === post.id && comment.content}</p>
              </li>
              )} else {return null}
             })
        return (

        <article key={post.id} style={articleStyle}>
            <article style={{borderStyle:"ridge"}}>
            <h1 style={postTitleStyle}>{post.title}</h1>
            <img src={post.img_url} alt={post.title} style={imgStyle}></img>
            <p style={postContentStyle}>{post.content}</p>
            <strong style={{paddingLeft:"8px"}}>Your Comments:</strong>
            <ol>
                {postComments}
            </ol>
            </article>
        </article>

        )
} else {return null}
})

    return (
        <div style={{marginLeft: '10px'}}>
            <strong style={headerStyle}>Display Name: {currentUser.display_name}</strong>
            <img src={currentUser.img_url} alt="pfp" style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "30%"}}/>
            <br />
           <strong style={postHeaderStyle}> Posts you have commented on:</strong>
            {currentUser.comments !== null && displayPosts}
        </div>
    )

}



export default UserDisplay;