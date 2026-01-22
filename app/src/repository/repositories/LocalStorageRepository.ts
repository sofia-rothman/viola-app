import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"
import { storage } from "../../utils/localstorage"
import type ITaskRepository from "../interface/ITaskRepository"

export default class LocalStorageRepository implements ITaskRepository {
  async getTasks(): Promise<Task[] | null> {
    try {
      const tasks = storage.get<Task[]>("tasks")
      return tasks
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      storage.save("tasks", tasks)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async getBalance(): Promise<number | null> {
    try {
      const balance = storage.get<number>("balance")
      return balance
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async saveBalance(balance: number): Promise<void> {
    try {
      storage.save("balance", balance)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async getXPpoints(): Promise<number | null> {
    try {
      const XPpoints = storage.get<number>("XPpoints")
      return XPpoints
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async saveXPpoints(XPpoints: number): Promise<void> {
    try {
      storage.save("XPpoints", XPpoints)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }

  async getPurchase(): Promise<Purchase[] | null> {
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

  async savePurchase(purchase: Purchase[]): Promise<void> {
    try {
      storage.save("purchase", purchase)
    } catch (error) {
      throw "Method not implemented: " + error
    }
  }
}
