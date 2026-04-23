import { createContext, useContext } from "react"
import type { Account } from "../types/Account"

interface AccountContextValue {
  account: Account | null
  saveBalance: (balance: number) => void
  saveXP: (XP: number) => void
  saveAccount: () => void
  savePoints: (points: number) => void
  loading: boolean
}

export const AccountContext = createContext<AccountContextValue | undefined>(
  undefined
)

export default function useAccountContext() {
  const context = useContext(AccountContext)

  if (context === undefined) {
    throw new Error("useAccountContext must be used within an AccountProvider")
  }

  return context
}