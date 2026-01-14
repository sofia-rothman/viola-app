export interface Reward {
  id: string
  title: string
  price: number
  emoji: string
}

export const createReward = (title: string, price: number, emoji: string) => {
  return {
    id: crypto.randomUUID(),
    title: title,
    price: price,
    emoji: emoji,
  }
}
