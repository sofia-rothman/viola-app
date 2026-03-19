import type { Account } from "../../types/Account"
import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"

export default interface ITaskRepository {
  storeUser(account: Account, userId: string): void
  getUser(userId: string): Promise<Account | null>
  getTasks(userId: string): Promise<Task[] | null>
  saveTasks(tasks: Task[], userId: string): Promise<void>
  getBalance(userId: string): Promise<number | null>
  saveBalance(balance: number, userId: string): Promise<void>
  getXPpoints(userId: string): Promise<number | null>
  saveXPpoints(XPpoints: number, userId: string): Promise<void>
  getPurchase(userId: string): Promise<Purchase[] | null>
  savePurchase(purchase: Purchase[], userId: string): Promise<void>
}
