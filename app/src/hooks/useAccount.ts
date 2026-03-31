import { useState, useEffect } from "react";
import { createAccount, type Account } from "../types/Account";
import { taskRepository } from "../repository"
import type { User } from "firebase/auth";

interface useAccountProps {
	user: User | null
}

export const useAccount = (props: useAccountProps) => {
	const { user } = props
	const [account, setAccount] = useState<Account | null>(null)
	const [loading, setLoading] = useState(false)


	const saveAccount = () => {
		user?.uid &&
		setAccount(createAccount(user?.uid))
	}

	useEffect(() => {
		if (user) {
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

					console.log('ACCOUNT from task repository: ' + account + ' ' + account?.balance + ' ' + account?.experience)

				} catch (err) {
          console.error("Hämtning misslyckades:", err)
        } finally {
          setLoading(false)
        }
			}
			getAccountFromDatabase()
		}
	}, [user?.uid])

	return { account, saveAccount, loading }
}