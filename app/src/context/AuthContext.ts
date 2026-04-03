import { createContext, useContext } from "react"
import type { User } from "firebase/auth"

interface AuthContextValue {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)

export default function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return context
}
