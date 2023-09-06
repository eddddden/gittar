// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBrymH5iGhrPa1yER4KzrGTtQ92rjZAOeU",
  authDomain: "stringvibeschat-ec648.firebaseapp.com",
  projectId: "stringvibeschat-ec648",
  storageBucket: "stringvibeschat-ec648.appspot.com",
  messagingSenderId: "677161295842",
  appId: "1:677161295842:web:c0dee29ab8bc388ac8e3bb"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
