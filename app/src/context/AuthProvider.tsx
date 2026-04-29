import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

interface AuthProviderProps {
  children: React.ReactNode
}

/** Provides the Firebase auth subscription to the rest of the app. */
export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const { user, loading } = useAuth()

  const values = {
    user,
    loading,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
