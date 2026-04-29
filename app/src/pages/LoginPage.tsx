import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../firebaseConfig"

/** Debug helper page sign-in flow used outside the main UserMenu component. */
const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    console.log("Inloggad som:", result.user.displayName)
    console.log("token:", token)
    console.log("user:", user)
  } catch (error) {
    console.error("Inloggning misslyckades:", error)
  }
}

/** Debug helper that signs out the current Firebase user. */
const handleLogout = () => signOut(auth)

/** Debug helper for checking the current Firebase user in development. */
const showUserName = () => {
  console.log("Inloggad som:", auth.currentUser)
}

/** Standalone login controls retained for auth debugging. */
const LoginPage = () => {
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logoff</button>
      <button onClick={showUserName}>Show USername</button>
    </div>
  )
}

export default LoginPage
