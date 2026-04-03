import { db } from "./../../firebaseConfig"
import type IRepository from "../interface/IRepository"
import type { Task } from "../../types/Task"
import type { Purchase } from "../../types/Purchase"
import type { Account } from "../../types/Account"
import { collection, doc, getDoc, getDocs, or, query, setDoc, Timestamp, where, writeBatch } from "firebase/firestore"

export default class FirebaseRepository implements IRepository {
  async storeUser(accountInfo: Account, userId: string): Promise<void> {
    const userRef = doc(db, "users", userId);
    try {
      await setDoc(userRef, accountInfo);
    } catch (error) {
      console.error("Fel vid storeUser:", error);
    }
  }

  async fetchUser(userId: string): Promise<Account | null> {
    const userRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() as Account : null;
    } catch (error) {
      console.error("Fel vid getUser:", error);
      return null;
    }
  }

  async fetchTasks(userId: string): Promise<Task[] | null> {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, or( where("creator", "==", userId), where("assignee", "==", userId)));

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          dueDate: data.dueDate instanceof Timestamp ? data.dueDate.toDate() : data.dueDate
        } as Task;
      });
    } catch (error) {
      console.error("Fel vid getTasks:", error);
      return [];
    }
  }

  async storeTasks(tasks: Task[]): Promise<void> {
    const batch = writeBatch(db);

    tasks.map((task) => {
      const taskRef = doc(db, "tasks", task.id);
      batch.set(taskRef, task)
    })

    try {
      await batch.commit()
    } catch (error) {
      console.error("Fel vid storeTasks:", error);
    }
  }

  fetchBalance(_userId: string): Promise<number | null> {
    throw new Error("Method not implemented.")
  }
  async storeBalance(_balance: number, _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  fetchXPpoints(_userId: string): Promise<number | null> {
    throw new Error("Method not implemented.")
  }
  async storeXPpoints(_XPpoints: number, _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  fetchPurchase(_userId: string): Promise<Purchase[] | null> {
    throw new Error("Method not implemented.")
  }
  async storePurchase(_purchase: Purchase[], _userId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  /* private getUserRef(path: string, userId: string) {
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
 
   async fetchUser(userId: string): Promise<Account | null> {
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
 
   async fetchTasks(userId: string): Promise<Task[] | null> {
     console.log(`[Firebase] getTasks anropad för userId: ${userId}`);
     try {
       const dbRef = this.getUserRef("tasks", userId);
       const snapshot = await get(dbRef);
       const data = snapshot.exists() ? snapshot.val() : [];
 
       return data ? data.map((p: Task) => ({
         ...p,
         dueDate: p.dueDate ? new Date(p.dueDate) : null,
       })) : null  
     } catch (error) {
       console.error("[Firebase] Kunde inte hämta tasks:", error);
       return [];
     }
   }
   
   async storeTasks(tasks: Task[], userId: string): Promise<void> {
     console.log(`[Firebase] storeTasks: Sparar ${tasks.length} tasks för ${userId}`);
     const tasksToSave = tasks.map((p: Task) => ({
       ...p,
       dueDate: p.dueDate ? JSON.stringify(p.dueDate) : null,
     })) 
 
     const dbRef = this.getUserRef("tasks", userId);
 
     try {
       await set(dbRef, tasksToSave);
       console.log(`[Firebase] storeTasks: Sparat lyckades.`);
     } catch (error) {
       console.error("[Firebase] Fel vid storeTasks:", error);
     }
   }
 
   async fetchBalance(userId: string): Promise<number | null> {
     console.log(`[Firebase] getBalance för ${userId}`);
     const dbRef = this.getUserRef("balance", userId);
     const snapshot = await get(dbRef);
     const balance = snapshot.exists() ? snapshot.val() : 0;
     return balance ? balance : 0;
   }
 
   async storeBalance(balance: number, userId: string): Promise<void> {
     console.log(`[Firebase] storeBalance: Sätter balans till ${balance} för ${userId}`);
     const dbRef = this.getUserRef("balance", userId);
     await set(dbRef, balance);
   }
 
   async fetchXPpoints(userId: string): Promise<number | null> {
     console.log(`[Firebase] getXPpoints för ${userId}`);
     const dbRef = this.getUserRef("experience", userId);
     const snapshot = await get(dbRef);
     const xp = snapshot.exists() ? snapshot.val() : 0;
     console.log(`[Firebase] getXPpoints: Värde är ${xp}`);
     return xp;
   }
 
   async storeXPpoints(XPpoints: number, userId: string): Promise<void> {
     console.log(`[Firebase] storeXPpoints: Sätter XP till ${XPpoints} för ${userId}`);
     const dbRef = this.getUserRef("experience", userId);
     await set(dbRef, XPpoints);
   }
 
   async fetchPurchase(userId: string): Promise<Purchase[] | null> {
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
 
   async storePurchase(purchase: Purchase[], userId: string): Promise<void> {
     console.log(`[Firebase] storePurchase: Sparar ${purchase.length} köp för ${userId}`);
     const purchases = purchase.map((m) => ({
       ...m,
       dateOfPurchase: m.dateOfPurchase.toISOString(),
     }));
 
     const dbRef = this.getUserRef("purchase", userId);
     try {
       await set(dbRef, purchases);
       console.log(`[Firebase] storePurchase: Klart.`);
     } catch (error) {
       console.error(`[Firebase] Fel vid storePurchase:`, error);
     }
   }*/
}