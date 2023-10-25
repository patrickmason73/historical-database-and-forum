import React, { useState } from "react"



function Signup ({ errors, handleSignUp }) {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [bio, setBio] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        handleSignUp(username, password, passwordConfirmation, displayName, imgURL, bio)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password
                <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password Confirmation
                <input 
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </label>
            <br />
            <label>
                Display Name - This Is The Name Other Users Will See
                <input 
                type="text"
                id="display_name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Bio:
                <br />
                <textarea 
                rows="4"
                cols="60"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />
            </label>
            <br />
            <label>
                Profile Picture URL
                <input 
                type="text"
                id="imgURL"
                value={imgURL}
                onChange={(e) => setImgURL(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">CREATE ACCOUNT</button>
            <ul>{errors && errors.map((err) => (
                <li key={err}>{err}</li>
            ))}</ul>
        </form>
    )

}

export default Signup