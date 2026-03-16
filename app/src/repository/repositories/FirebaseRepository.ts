import { ref, get, set } from "firebase/database"
import { db } from "./../../firebaseConfig" 
import type ITaskRepository from "../interface/ITaskRepository"
import type { Task } from "../../types/Task"
import type { Purchase } from "../../types/Purchase"

export default class FirebaseTaskRepository implements ITaskRepository {
  private getUserRef(path: string, userId: string) {
    return ref(db, `users/${userId}/${path}`);
  }

  async getTasks(userId: string): Promise<Task[] | null> {
    try {
      const dbRef = this.getUserRef("tasks", userId);
      const snapshot = await get(dbRef);
      return snapshot.exists() ? snapshot.val() : [];
    } catch (error) {
      console.error("Kunde inte hämta tasks:", error);
      return [];
    }
  }

  async saveTasks(tasks: Task[], userId: string): Promise<void> {
    const dbRef = this.getUserRef("tasks", userId);
    await set(dbRef, tasks);
  }

  async getBalance(userId: string): Promise<number | null> {
    const dbRef = this.getUserRef("balance", userId);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : 0;
  }

  async saveBalance(balance: number, userId: string): Promise<void> {
    const dbRef = this.getUserRef("balance", userId);
    await set(dbRef, balance);
  }

  async getXPpoints(userId: string): Promise<number | null> {
    const dbRef = this.getUserRef("XPpoints", userId);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : 0;
  }

  async saveXPpoints(XPpoints: number, userId: string): Promise<void> {
    const dbRef = this.getUserRef("XPpoints", userId);
    await set(dbRef, XPpoints);
  }

  async getPurchase(userId: string): Promise<Purchase[] | null> {
    const dbRef = this.getUserRef("purchase", userId);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const purchaseArray = Array.isArray(data) ? data : Object.values(data);
      
      return purchaseArray.map((m: any) => ({
        ...m,
        dateOfPurchase: new Date(m.dateOfPurchase),
      }));
    }
    return [];
  }

  async savePurchase(purchase: Purchase[], userId: string): Promise<void> {
    const purchases = purchase.map((m) => ({
      ...m,
      dateOfPurchase: m.dateOfPurchase.toISOString(),
    }));
    
    const dbRef = this.getUserRef("purchase", userId);
    await set(dbRef, purchases);
  }
}