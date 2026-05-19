/** Stores the user's progress, wallet balance, and family relationships. */
export interface Account {
  id: string
  experience: number
  balance: number
  points: number
  restrictedItems: string[]
  children: string[]
  parents: string[]
}

/** Creates the initial account document for a newly signed-in user. */
export const createAccount = (uid: string): Account => {
  return {
    id: uid,
    experience: 0,
    balance: 0,
    points: 0,
    restrictedItems: [],
    children: [],
    parents: [],
  }
}
