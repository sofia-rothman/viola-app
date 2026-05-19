/** A reward that can be bought with earned task balance. */
export interface Reward {
  id: string
  title: string
  price: number
  emoji: string
}

/** Creates a reward with a stable id for rendering and purchase history. */
export const createReward = (title: string, price: number, emoji: string): Reward => {
  return {
    id: crypto.randomUUID(),
    title,
    price,
    emoji,
  }
}
