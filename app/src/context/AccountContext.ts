import { createContext, useContext } from "react"
import type { Account } from "../types/Account"

export const AccountContext = createContext<Account | undefined>(
  undefined
)

export default function useAccountContext() {
  const account = useContext(AccountContext)

  if (account === undefined) {
    throw new Error("useAccountContext must be used with AccountContext")
  }

  return account
}
