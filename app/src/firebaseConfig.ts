// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  databaseURL:
    "https://viola-task-manager-default-rtdb.europe-west1.firebasedatabase.app",
  apiKey: "AIzaSyAzvnqHq89ZPptqK-78ah5BiUcaBtIEt5Y",
  authDomain: "viola-task-manager.firebaseapp.com",
  projectId: "viola-task-manager",
  storageBucket: "viola-task-manager.firebasestorage.app",
  messagingSenderId: "623485285936",
  appId: "1:623485285936:web:49fcde0395a545ea331ff5",
  measurementId: "G-F4FKGSEW12",
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getDatabase(app)
