// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0XqHQCgtVo9HNWY5nOzyfoJXNzYtYlQg",
  authDomain: "fir-contact-app-88a0e.firebaseapp.com",
  projectId: "fir-contact-app-88a0e",
  storageBucket: "fir-contact-app-88a0e.appspot.com",
  messagingSenderId: "150592749520",
  appId: "1:150592749520:web:352136352e7561800103d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);