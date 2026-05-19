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
          completedAt:
            data.completedAt instanceof Timestamp ? data.completedAt.toDate() : data.completedAt,
          approvedAt:
            data.approvedAt instanceof Timestamp ? data.approvedAt.toDate() : data.approvedAt,
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

  /** Fetches the balance field from the user's account document. */
  async fetchBalance(userId: string): Promise<number | null> {
    try {
      const account = await this.fetchUser(userId)
      return account?.balance ?? null
    } catch (error) {
      console.error("Fel vid fetchBalance:", error)
      return null
    }
  }

  /** Updates the balance field on the user's account document. */
  async storeBalance(balance: number, userId: string): Promise<void> {
    const userRef = doc(db, "users", userId)
    try {
      await setDoc(userRef, { balance }, { merge: true })
    } catch (error) {
      console.error("Fel vid storeBalance:", error)
    }
  }

  /** Fetches the experience field from the user's account document. */
  async fetchXPpoints(userId: string): Promise<number | null> {
    try {
      const account = await this.fetchUser(userId)
      return account?.experience ?? null
    } catch (error) {
      console.error("Fel vid fetchXPpoints:", error)
      return null
    }
  }

  /** Updates the experience field on the user's account document. */
  async storeXPpoints(experiencePoints: number, userId: string): Promise<void> {
    const userRef = doc(db, "users", userId)
    try {
      await setDoc(userRef, { experience: experiencePoints }, { merge: true })
    } catch (error) {
      console.error("Fel vid storeXPpoints:", error)
    }
  }

  /** Fetches all purchases from the user's purchases subcollection. */
  async fetchPurchase(userId: string): Promise<Purchase[] | null> {
    const purchasesRef = collection(db, "users", userId, "purchases")

    try {
      const querySnapshot = await getDocs(purchasesRef)
      return querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data()

        // Convert Firestore Timestamp to Date for dateOfPurchase
        return {
          ...data,
          dateOfPurchase:
            data.dateOfPurchase instanceof Timestamp
              ? data.dateOfPurchase.toDate()
              : data.dateOfPurchase,
        } as Purchase
      })
    } catch (error) {
      console.error("Fel vid fetchPurchase:", error)
      return []
    }
  }

  /** Stores all purchases to the user's purchases subcollection. */
  async storePurchase(purchase: Purchase[], userId: string): Promise<void> {
    const batch = writeBatch(db)

    purchase.forEach((item) => {
      const purchaseRef = doc(db, "users", userId, "purchases", item.instanceId)
      batch.set(purchaseRef, item)
    })

    try {
      await batch.commit()
    } catch (error) {
      console.error("Fel vid storePurchase:", error)
    }
  }
}
