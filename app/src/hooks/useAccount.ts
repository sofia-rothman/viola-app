import { useState, useEffect } from "react"
import { createAccount, type Account } from "../types/Account"
import { taskRepository } from "../repository"
import type { User } from "firebase/auth"

interface UseAccountProps {
  user: User | null
  isLoadingAuth: boolean
}

/**
 * Loads the signed-in user's account and exposes small mutations for progress and balance.
 *
 * Account writes are centralized here so providers and UI components do not need repository details.
 */
export const useAccount = (props: UseAccountProps) => {
  const { user, isLoadingAuth } = props
  const [account, setAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState(false)

  const saveAccount = () => {
    user?.uid && setAccount(createAccount(user?.uid))
  }

  const savePoints = (points: number) => {
    if (!account) return
    setAccount((prev) => ({ ...prev!, points: points }))
  }

  const saveBalance = (balance: number) => {
    if (!account) return
    setAccount((prev) => ({ ...prev!, balance: prev!.balance + balance }))
  }

  const saveXP = (experiencePoints: number) => {
    if (!account) return
    setAccount((prev) => ({ ...prev!, experience: prev!.experience + experiencePoints }))
  }

  useEffect(() => {
    if (user && !isLoadingAuth && account == null) {
      setLoading(true)

      const getAccountFromDatabase = async () => {
        try {
          const savedAccount = await taskRepository.fetchUser(user.uid)

          if (savedAccount) {
            setAccount(savedAccount)
          } else {
            const newAccount = createAccount(user.uid)
            await taskRepository.storeUser(newAccount, user.uid)
            setAccount(newAccount)
          }
        } catch (err) {
          console.error("Hämtning misslyckades:", err)
        } finally {
          setLoading(false)
        }
      }
      getAccountFromDatabase()
    }
  }, [user?.uid])

  useEffect(() => {
    if (loading || isLoadingAuth || account == null || user == null) return

    // Persist account changes after loading finishes to avoid replacing remote data on startup.
    const storeData = async () => {
      try {
        await taskRepository.storeUser(account, user?.uid)
      } catch (err) {
        console.error("Bakgrundssparande misslyckades:", err)
      }
    }

    storeData()
  }, [account, loading])

  return { account, saveAccount, savePoints, saveBalance, saveXP, loading }
}
