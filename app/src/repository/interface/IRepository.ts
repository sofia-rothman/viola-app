import type { Account } from "../../types/Account"
import type { Purchase } from "../../types/Purchase"
import type { Task } from "../../types/Task"

export default interface IRepository {
  storeUser(accountInfo: Account, userId: string): Promise<void>
  fetchUser(userId: string): Promise<Account | null>
  fetchTasks(userId: string): Promise<Task[] | null>
  storeTasks(tasks: Task[]): Promise<void>
  fetchBalance(userId: string): Promise<number | null>
  storeBalance(balance: number, userId: string): Promise<void>
  fetchXPpoints(userId: string): Promise<number | null>
  storeXPpoints(XPpoints: number, userId: string): Promise<void>
  fetchPurchase(userId: string): Promise<Purchase[] | null>
  storePurchase(purchase: Purchase[], userId: string): Promise<void>
}
