import { ref, get, set } from "firebase/database"
import { db } from "./../../firebaseConfig"
import type ITaskRepository from "../interface/ITaskRepository"
import type { Task } from "../../types/Task"
import type { Purchase } from "../../types/Purchase"
import type { Account } from "../../types/Account"

export default class FirebaseTaskRepository implements ITaskRepository {
  private getUserRef(path: string, userId: string) {
    const fullPath = `users/${userId}/${path}`;
    return ref(db, fullPath);
  }

  async storeUser(accountInfo: Account, userId: string): Promise<void> {
    console.log(`[Firebase] storeUser anropad för userId: ${userId}`);
    const dbRef = ref(db, `users/${userId}`);
    try {
      await set(dbRef, accountInfo);
      console.log(`[Firebase] storeUser: Klart!`);
    } catch (error) {
      console.error(`[Firebase] Fel vid storeUser:`, error);
    }
  }

  async getUser(userId: string): Promise<Account | null> {
    console.log(`[Firebase] getUser anropad för userId: ${userId}`);
    const dbRef = ref(db, `users/${userId}`);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        console.log(`[Firebase] getUser: Hittade konto.`);
        return snapshot.val();
      }
      console.warn(`[Firebase] getUser: Inget konto hittades.`);
      return null;
    } catch (error) {
      console.error(`[Firebase] Fel vid getUser:`, error);
      return null;
    }
  }

  async getTasks(userId: string): Promise<Task[] | null> {
    console.log(`[Firebase] getTasks anropad för userId: ${userId}`);
    try {
      const dbRef = this.getUserRef("tasks", userId);
      const snapshot = await get(dbRef);
      const data = snapshot.exists() ? snapshot.val() : [];
      console.log(`[Firebase] getTasks: Hämtade ${Array.isArray(data) ? data.length : 0} tasks.`);
      return data;
    } catch (error) {
      console.error("[Firebase] Kunde inte hämta tasks:", error);
      return [];
    }
  }

  async saveTasks(tasks: Task[], userId: string): Promise<void> {
    console.log(`[Firebase] saveTasks: Sparar ${tasks.length} tasks för ${userId}`);
    const dbRef = this.getUserRef("tasks", userId);
    try {
      await set(dbRef, tasks);
      console.log(`[Firebase] saveTasks: Sparat lyckades.`);
    } catch (error) {
      console.error("[Firebase] Fel vid saveTasks:", error);
    }
  }

  async getBalance(userId: string): Promise<number | null> {
    console.log(`[Firebase] getBalance för ${userId}`);
    const dbRef = this.getUserRef("balance", userId);
    const snapshot = await get(dbRef);
    const balance = snapshot.exists() ? snapshot.val() : 0;
    console.log(`[Firebase] getBalance: Värde är ${balance}`);
    return balance;
  }

  async saveBalance(balance: number, userId: string): Promise<void> {
    console.log(`[Firebase] saveBalance: Sätter balans till ${balance} för ${userId}`);
    const dbRef = this.getUserRef("balance", userId);
    await set(dbRef, balance);
  }

  async getXPpoints(userId: string): Promise<number | null> {
    console.log(`[Firebase] getXPpoints för ${userId}`);
    const dbRef = this.getUserRef("experience", userId);
    const snapshot = await get(dbRef);
    const xp = snapshot.exists() ? snapshot.val() : 0;
    console.log(`[Firebase] getXPpoints: Värde är ${xp}`);
    return xp;
  }

  async saveXPpoints(XPpoints: number, userId: string): Promise<void> {
    console.log(`[Firebase] saveXPpoints: Sätter XP till ${XPpoints} för ${userId}`);
    const dbRef = this.getUserRef("experience", userId);
    await set(dbRef, XPpoints);
  }

  async getPurchase(userId: string): Promise<Purchase[] | null> {
    console.log(`[Firebase] getPurchase för ${userId}`);
    const dbRef = this.getUserRef("purchase", userId);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const purchaseArray = Array.isArray(data) ? data : Object.values(data);
      console.log(`[Firebase] getPurchase: Hittade ${purchaseArray.length} köp.`);

      return purchaseArray.map((m: any) => ({
        ...m,
        dateOfPurchase: new Date(m.dateOfPurchase),
      }));
    }
    console.log(`[Firebase] getPurchase: Inga köp hittades.`);
    return [];
  }

  async savePurchase(purchase: Purchase[], userId: string): Promise<void> {
    console.log(`[Firebase] savePurchase: Sparar ${purchase.length} köp för ${userId}`);
    const purchases = purchase.map((m) => ({
      ...m,
      dateOfPurchase: m.dateOfPurchase.toISOString(),
    }));

    const dbRef = this.getUserRef("purchase", userId);
    try {
      await set(dbRef, purchases);
      console.log(`[Firebase] savePurchase: Klart.`);
    } catch (error) {
      console.error(`[Firebase] Fel vid savePurchase:`, error);
    }
  }
}