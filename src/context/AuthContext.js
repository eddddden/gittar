import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Redirect } from "react-router-dom" // You should import Redirect from react-router-dom

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { // Fix the prop name here
    const [currentUser, setCurrentUser]  = useState(null) // Initialize currentUser to null

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => {
            unsub();
        };
    }, []);
    
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
