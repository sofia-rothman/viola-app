import { useAccount } from "../hooks/useAccount"
import { AccountContext } from "./AccountContext"
import useAuthContext from "./AuthContext"

interface AccountProviderProps {
  children: React.ReactNode
}

export const AccountProvider = (props: AccountProviderProps) => {
  const { children } = props
  const { user, loading: isLoadingAuth } = useAuthContext()
  const { account, saveAccount, savePoints, saveBalance, saveXP, loading } = useAccount({user: user, isLoadingAuth: isLoadingAuth})

  const values = {
    account: account,
    saveAccount: saveAccount,
    savePoints: savePoints,
    saveBalance: saveBalance,
    saveXP: saveXP,
    loading: loading,
  }

  return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}
