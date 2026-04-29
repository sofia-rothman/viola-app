import { createContext, useContext } from "react"
import type { Account } from "../types/Account"

interface AccountContextValue {
  account: Account | null
  saveBalance: (balance: number) => void
  saveXP: (experiencePoints: number) => void
  saveAccount: () => void
  savePoints: (points: number) => void
  loading: boolean
}

/** Context boundary for account progress and wallet state. */
export const AccountContext = createContext<AccountContextValue | undefined>(undefined)

/** Returns account state and mutations scoped to the active user. */
export default function useAccountContext() {
  const context = useContext(AccountContext)

  if (context === undefined) {
    throw new Error("useAccountContext must be used within an AccountProvider")
  }

  return context
}
