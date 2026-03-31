import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const { user, loading } = useAuth()

  const values = {
    user: user,
    loading: loading,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
