import React, { useState } from "react"



function Signup ({ setCurrentUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [bio, setBio] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                display_name: displayName,
                img_url: imgURL,
                bio,
            }),
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => setCurrentUser(user))
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
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
            <p>{errors.map((err) => (
                <p key={err}>{err}</p>
            ))}</p>
        </form>
    )

}

export default Signup