import type { Reward } from "./Reward"

/** A concrete reward purchase, separate from the reusable reward catalog item. */
export interface Purchase extends Reward {
  instanceId: string
  dateOfPurchase: Date
}

/** Captures a reward purchase with its own id and timestamp for history rendering. */
export const createPurchase = (reward: Reward): Purchase => {
  return {
    ...reward,
    instanceId: crypto.randomUUID(),
    dateOfPurchase: new Date(),
  }
}
