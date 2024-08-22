// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmTg-tz1fGL1dEutFrJarV5e8nokCl39Y",
  authDomain: "anniversarybangkokhatyai.firebaseapp.com",
  databaseURL: "https://anniversarybangkokhatyai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anniversarybangkokhatyai",
  storageBucket: "anniversarybangkokhatyai.appspot.com",
  messagingSenderId: "611719223943",
  appId: "1:611719223943:web:d14d060c883e87b83fb622",
  measurementId: "G-2BS0YPY9F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export {database}

