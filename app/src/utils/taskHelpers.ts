import type { Task } from "../types/Task"

/** Calculates earned task points from currently completed tasks. */
export const calculatePoints = (tasks: Task[]): number => {
  return tasks.filter((task) => task.status === "completed").length * 10 || 0
}

/** Converts total experience into a level based on the configured points-per-level goal. */
export const calculateLevel = (xp: number, goal: number): number => {
  if (goal === 0) return -1
  return xp / goal
}
