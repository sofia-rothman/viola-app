import { useState } from "react"
import { loginWithGoogle, logout } from "../../services/authService"
import "./UserMenu.css"
import useAccountContext from "../../context/AccountContext"
import useAuthContext from "../../context/AuthContext"

/** Handles Google sign-in state and account actions in the header. */
const UserMenu = () => {
  const { user } = useAuthContext()
  const { loading } = useAccountContext()
  const [error, setError] = useState<string | null>(null)

  if (loading) return <div className="loader">Hämtar profil...</div>

  const handleLogin = async () => {
    setError(null)
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (!user) {
    return (
      <div className="auth-container">
        <button className="login-btn" onClick={handleLogin}>
          Logga in med Google
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>
    )
  }

  return (
    <div className="user-info">
      <img src={user.photoURL || ""} alt={user.displayName || "Profil"} className="avatar" />
      <button className="logout-btn" onClick={logout}>
        Logga ut
      </button>
    </div>
  )
}

export default UserMenu
