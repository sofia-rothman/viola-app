import { db } from "../../firebaseConfig"
import type IRepository from "../interface/IRepository"
import type { Task } from "../../types/Task"
import type { Purchase } from "../../types/Purchase"
import type { Account } from "../../types/Account"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore"

/**
 * Firestore-backed repository used by the live app.
 *
 * Methods catch remote failures so UI state can keep rendering with safe fallbacks.
 */
export default class FirebaseRepository implements IRepository {
  /** Stores the complete account document for a user. */
  async storeUser(accountInfo: Account, userId: string): Promise<void> {
    const userRef = doc(db, "users", userId)
    try {
      await setDoc(userRef, accountInfo)
    } catch (error) {
      console.error("Fel vid storeUser:", error)
    }
  }

  /** Fetches a user's account document or null when no account has been created yet. */
  async fetchUser(userId: string): Promise<Account | null> {
    const userRef = doc(db, "users", userId)

    try {
      const userDoc = await getDoc(userRef)
      return userDoc.exists() ? (userDoc.data() as Account) : null
    } catch (error) {
      console.error("Fel vid getUser:", error)
      return null
    }
  }

  /** Fetches tasks where the user is either creator or assignee. */
  async fetchTasks(userId: string): Promise<Task[] | null> {
    const tasksRef = collection(db, "tasks")
    const tasksForUserQuery = query(
      tasksRef,
      or(where("creator", "==", userId), where("assignee", "==", userId)),
    )

    try {
      const querySnapshot = await getDocs(tasksForUserQuery)
      return querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data()

        // Firestore Timestamps need conversion before the rest of the app treats dates as Date objects.
        return {
          ...data,
          id: docSnap.id,
          dueDate: data.dueDate instanceof Timestamp ? data.dueDate.toDate() : data.dueDate,
        } as Task
      })
    } catch (error) {
      console.error("Fel vid getTasks:", error)
      return []
    }
  }

  /** Persists tasks as a batch so related task changes are committed together. */
  async storeTasks(tasks: Task[]): Promise<void> {
    const batch = writeBatch(db)

    tasks.forEach((task) => {
      const taskRef = doc(db, "tasks", task.id)
      batch.set(taskRef, task)
    })

    try {
      await batch.commit()
    } catch (error) {
      console.error("Fel vid storeTasks:", error)
    }
  }

  /** Not implemented because balance is currently stored on the user account document. */
  fetchBalance(_userId: string): Promise<number | null> {
    throw new Error("Method not implemented.")
  }

  /** Not implemented because balance is currently stored on the user account document. */
  async storeBalance(_balance: number, _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  /** Not implemented because XP is currently stored on the user account document. */
  fetchXPpoints(_userId: string): Promise<number | null> {
    throw new Error("Method not implemented.")
  }

  /** Not implemented because XP is currently stored on the user account document. */
  async storeXPpoints(_experiencePoints: number, _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  /** Not implemented because purchase history has not been wired to Firestore yet. */
  fetchPurchase(_userId: string): Promise<Purchase[] | null> {
    throw new Error("Method not implemented.")
  }

  /** Not implemented because purchase history has not been wired to Firestore yet. */
  async storePurchase(_purchase: Purchase[], _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
