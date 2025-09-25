// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-multimodel.firebaseapp.com",
  projectId: "ai-multimodel",
  storageBucket: "ai-multimodel.firebasestorage.app",
  messagingSenderId: "755119082510",
  appId: "1:755119082510:web:72b9f4b7ac7a8abd9c005f",
  measurementId: "G-2HB73M150X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
