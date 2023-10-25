
import React, {useState, useEffect, createContext} from "react";


const UserContext = createContext();


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
  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };