import { useState, useEffect } from "react";
import { createAccount, type Account } from "../types/Account";
import { taskRepository } from "../repository"
import type { User } from "firebase/auth";

interface useAccountProps {
	user: User | null
	isLoadingAuth: boolean
}

export const useAccount = (props: useAccountProps) => {
	const { user, isLoadingAuth } = props	
	const [account, setAccount] = useState<Account | null>(null)
	const [loading, setLoading] = useState(false)

	const saveAccount = () => {
		user?.uid &&
		setAccount(createAccount(user?.uid))
	}

	const saveBalance = (balance: number) => {
		if(!account) return
		setAccount(prev => ({ ...prev!, balance: prev!.balance + balance }))
	}

	const saveXP = (XP: number) => {
		if(!account) return
		setAccount(prev => ({ ...prev!, experience: prev!.experience + XP }))
	}

	useEffect(() => {
		if (user && !isLoadingAuth && account == null) {
			setLoading(true)

			const getAccountFromDatabase = async () => {
				try {
					const account = await taskRepository.fetchUser(user.uid)

					if(account) {
						setAccount(account)
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

    const storeData = async () => {
      try {
        await taskRepository.storeUser(account, user?.uid)
      } catch (err) {
        console.error("Bakgrundssparande misslyckades:", err)
      }
    }

    storeData()
  }, [account, loading])

	return { account, saveAccount, saveBalance, saveXP, loading }
}