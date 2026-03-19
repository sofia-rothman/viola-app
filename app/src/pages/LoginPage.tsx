
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("Inloggad som:", result.user.displayName);
    console.log("token:", token);
    console.log("user:", user);
} catch (error) {
    console.error("Inloggning misslyckades:", error);
}
};

const handleLogout = () => signOut(auth);
const showUserName = () => {
    console.log("Inloggad som:", auth.currentUser);
    
};

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
