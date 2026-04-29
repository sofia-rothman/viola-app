import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"
import type { Account } from "../../types/Account"
import { storage } from "../../utils/localstorage"
import type ITaskRepository from "../interface/IRepository"

/**
 * Browser storage repository for local development and offline fallback scenarios.
 *
 * It mirrors the repository contract without requiring a Firebase project.
 */
export default class LocalStorageRepository implements ITaskRepository {
  /** Reads locally stored tasks for the current browser profile. */
  async fetchTasks(_userId: string): Promise<Task[] | null> {
    try {
      const tasks = storage.get<Task[]>("tasks")
      return tasks
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Stores tasks locally so development state survives page refreshes. */
  async storeTasks(tasks: Task[]): Promise<void> {
    try {
      storage.save("tasks", tasks)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Reads the local wallet balance. */
  async fetchBalance(_userId: string): Promise<number | null> {
    try {
      const balance = storage.get<number>("balance")
      return balance
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Stores the local wallet balance. */
  async storeBalance(balance: number, _userId: string): Promise<void> {
    try {
      storage.save("balance", balance)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Reads locally stored experience points. */
  async fetchXPpoints(_userId: string): Promise<number | null> {
    try {
      const experiencePoints = storage.get<number>("XPpoints")
      return experiencePoints
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Stores experience points locally. */
  async storeXPpoints(experiencePoints: number, _userId: string): Promise<void> {
    try {
      storage.save("XPpoints", experiencePoints)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Reads purchase history and restores purchase dates as Date objects. */
  async fetchPurchase(_userId: string): Promise<Purchase[] | null> {
    try {
      const purchase = storage.get<Purchase[]>("purchase")
      if (!purchase) return null

      return purchase.map((p) => ({
        ...p,
        dateOfPurchase: new Date(p.dateOfPurchase),
      }))
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Stores purchase history locally. */
  async storePurchase(purchase: Purchase[], _userId: string): Promise<void> {
    try {
      storage.save("purchase", purchase)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  /** Stores the account locally as a single shared fallback account. */
  async storeUser(accountInfo: Account, _userId: string): Promise<void> {
    // LocalStorage fallback: single shared account state (ignores userId).
    storage.save("account", accountInfo)
  }

  /** Reads the single shared fallback account from local storage. */
  async fetchUser(_userId: string): Promise<Account | null> {
    return storage.get<Account>("account")
  }
}
