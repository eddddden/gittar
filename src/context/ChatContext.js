import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Redirect } from "react-router-dom" // You should import Redirect from react-router-dom
import { AuthContext } from "./AuthContext"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => { // Fix the prop name here
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE ={
        chatId:"null",
        user:{}
    }
    
    const chatReducer = (state, action) => {
        switch (action.type) {
          case "CHANGE_USER":
            console.log("currentUser.uid:", currentUser.uid);
            console.log("action.payload.uid:", action.uid);
            
            const chatId =
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid;
            console.log("Calculated chatId:", chatId);
      
            return {
              user: action.payload,
              chatId: chatId,
            };
          default:
            return state;
        }
      };
      
      

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
