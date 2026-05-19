import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../firebaseConfig"

/** Starts Google sign-in and normalizes popup failures into user-friendly errors. */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Inloggningsfönstret stängdes innan det blev klart.")
    }
    throw new Error("Ett oväntat fel uppstod vid inloggning.")
  }
}

/** Ends the current Firebase auth session. */
export const logout = () => signOut(auth)
