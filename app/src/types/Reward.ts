export interface Reward {
  id: string
  title: string
  price: number
  emoji: string
}

export interface PurchasedReward extends Reward {
  instanceId: string
  dateOfPurchase: Date
}

export const createReward = (title: string, price: number, emoji: string) => {
  return {
    id: crypto.randomUUID(),
    title: title,
    price: price,
    emoji: emoji,
  }
}

export const createPurchasedReward = (reward: Reward) => {
  return {
    ...reward,
    instanceId: crypto.randomUUID(),
    dateOfPurchase: new Date(),
  }
}
