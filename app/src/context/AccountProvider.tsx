import { useAccount } from "../hooks/useAccount"
import { AccountContext } from "./AccountContext"
import useAuthContext from "./AuthContext"

interface AccountProviderProps {
  children: React.ReactNode
}

/** Provides account data after auth has resolved so account writes can be tied to a user id. */
export const AccountProvider = (props: AccountProviderProps) => {
  const { children } = props
  const { user, loading: isLoadingAuth } = useAuthContext()
  const { account, saveAccount, savePoints, saveBalance, saveXP, loading } = useAccount({
    user,
    isLoadingAuth,
  })

  const values = {
    account,
    saveAccount,
    savePoints,
    saveBalance,
    saveXP,
    loading,
  }

  return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}
