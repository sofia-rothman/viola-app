import { ref, get, set } from "firebase/database"
import { db } from "./../../firebaseConfig"
import type ITaskRepository from "../interface/ITaskRepository"
import type { Task } from "../../types/Task"
import type { Purchase } from "../../types/Purchase"

export default class FirebaseTaskRepository implements ITaskRepository {
  async getTasks(): Promise<Task[] | null> {
    const dbRef = ref(db, "tasks")
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return []
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    const dbRef = ref(db, "tasks")
    await set(dbRef, tasks)
  }

  async getBalance(): Promise<number | null> {
    const dbRef = ref(db, "balance")
    const snapshot = await get(dbRef)

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return 0
  }

  async saveBalance(balance: number): Promise<void> {
    const dbRef = ref(db, "balance")
    await set(dbRef, balance)
  }

  async getXPpoints(): Promise<number | null> {
    const dbRef = ref(db, "XPpoints")
    const snapshot = await get(dbRef)

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return 0
  }

  async saveXPpoints(XPpoints: number): Promise<void> {
    const dbRef = ref(db, "XPpoints")
    await set(dbRef, XPpoints)
  }

  async getPurchase(): Promise<Purchase[] | null> {
    const dbRef = ref(db, "purchase")
    const snapshot = await get(dbRef)

    if (snapshot.exists()) {
      return snapshot.val().map((m: Purchase) => ({
        ...m,
        dateOfPurchase: new Date(m.dateOfPurchase),
      }))
    }
    return []
  }

  async savePurchase(purchase: Purchase[]): Promise<void> {
    const purchases: Array<object> = []
    purchase.map((m) => {
      purchases.push({
        ...m,
        dateOfPurchase: m.dateOfPurchase.toISOString(),
      })
    })
    const dbRef = ref(db, "purchase")
    await set(dbRef, purchases)
  }
}
