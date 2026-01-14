import type { Reward } from "./Reward"

export interface Purchase extends Reward {
  instanceId: string
  dateOfPurchase: Date
}

export const createPurchase = (reward: Reward) => {
  return {
    ...reward,
    instanceId: crypto.randomUUID(),
    dateOfPurchase: new Date(),
  }
}
