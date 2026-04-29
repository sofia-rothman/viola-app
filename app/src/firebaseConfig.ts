import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Keep Firebase config centralized so repositories and auth services share one app instance.
const firebaseConfig = {
  databaseURL: "https://viola-task-manager-default-rtdb.europe-west1.firebasedatabase.app",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "viola-task-manager.firebaseapp.com",
  projectId: "viola-task-manager",
  storageBucket: "viola-task-manager.firebasestorage.app",
  messagingSenderId: "623485285936",
  appId: "1:623485285936:web:49fcde0395a545ea331ff5",
  measurementId: "G-F4FKGSEW12",
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

/** Firestore database shared by repositories. */
export const db = getFirestore(app)

/** Firebase auth instance shared by hooks and services. */
export const auth = getAuth(app)

/** Google sign-in provider configured once for popup auth. */
export const googleProvider = new GoogleAuthProvider()
