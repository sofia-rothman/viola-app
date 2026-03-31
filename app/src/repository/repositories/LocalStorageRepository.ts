import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"
import type { Account } from "../../types/Account"
import { storage } from "../../utils/localstorage"
import type ITaskRepository from "../interface/IRepository"

export default class LocalStorageRepository implements ITaskRepository {
  async fetchTasks(_userId: string): Promise<Task[] | null> {
    try {
      const tasks = storage.get<Task[]>("tasks")
      return tasks
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async storeTasks(tasks: Task[], _userId: string): Promise<void> {
    try {
      storage.save("tasks", tasks)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async fetchBalance(_userId: string): Promise<number | null> {
    try {
      const balance = storage.get<number>("balance")
      return balance
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async storeBalance(balance: number, _userId: string): Promise<void> {
    try {
      storage.save("balance", balance)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async fetchXPpoints(_userId: string): Promise<number | null> {
    try {
      const XPpoints = storage.get<number>("XPpoints")
      return XPpoints
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async storeXPpoints(XPpoints: number, _userId: string): Promise<void> {
    try {
      storage.save("XPpoints", XPpoints)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

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

  async storePurchase(purchase: Purchase[], _userId: string): Promise<void> {
    try {
      storage.save("purchase", purchase)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async storeUser(accountInfo: Account, _userId: string): Promise<void> {
    // LocalStorage fallback: single shared account state (ignores userId).
    storage.save("account", accountInfo)
  }

  async fetchUser(_userId: string): Promise<Account | null> {
    return storage.get<Account>("account")
  }
}
