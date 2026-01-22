import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"

export default interface ITaskRepository {
  getTasks(): Promise<Task[] | null>
  saveTasks(tasks: Task[]): Promise<void>
  getBalance(): Promise<number | null>
  saveBalance(balance: number): Promise<void>
  getXPpoints(): Promise<number | null>
  saveXPpoints(XPpoints: number): Promise<void>
  getPurchase(): Promise<Purchase[] | null>
  savePurchase(purchase: Purchase[]): Promise<void>
}
