import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { loginWithGoogle, logout } from "../../services/authService"
import './UserMenu.css'
import { useAccount } from "../../hooks/useAccount"

const UserMenu = () => {
  const { user } = useAuth()
  const { account } = useAccount({user})
  const [error, setError] = useState<string | null>(null)

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
        <button className="login-btn" onClick={handleLogin}>Logga in med Google</button>
        {error && <p className="error-text">{error}</p>}
      </div>
    )
  }

  return (
    <div className="user-info">
      <img src={user.photoURL || ""} alt={user.displayName || "Profil"} className="avatar" />
      <button className="logout-btn" onClick={logout}>Logga ut</button>
    </div>
  )
}

export default UserMenu