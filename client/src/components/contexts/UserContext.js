// src/context/user.js
import React, {useState, useEffect, createContext} from "react";

// create the context
const UserContext = createContext();

// create a provider component
function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        fetch("/me").then((res) => {
          if (res.ok) {
            res.json().then((user) => {
            setCurrentUser(user)
            console.log(user)
          })}
        })
      }, [])
  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };