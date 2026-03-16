import useTaskContext from "../../context/TaskContext"
import "./Header.css"
import CrownIcon from "../../../../app/src/assets/crown.svg?react"
import StatCard from "./components/StatCard/StatCard"
import ProgressBar from "./components/ProgressBar/ProgressBar"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../firebaseConfig"
import { useAuth } from "../../hooks/useAuth"

const Header = () => {
  const tasks = useTaskContext()
  const { user, loading } = useAuth();

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

  return (
    <div className="header">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logoff</button>
      <button onClick={showUserName}>Show USername</button>
      {user && 
      <div className="user-stats-card">
        <h2 className="name">
          Bonnie <CrownIcon />
        </h2>

        <div className="level">
          {tasks.title} • Level: {tasks.level}{" "}
        </div>

        <ProgressBar points={tasks.points} goal={tasks.goal} />

        <div>
          <div className="stat-card-container">
            <StatCard
              icon={"wallet"}
              label={"Plånbok"}
              value={`${tasks.balance} kr`}
            />

            <StatCard icon={"star"} label={"XP"} value={`${tasks.totalXP}`} />
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Header
