import type { Task } from "../types/Task"

export const calculatePoints = (tasks: Task[]): number => {
  return tasks.filter(task => task.completed).length * 10
}

export const calculateLevel = (xp: number, goal: number): number => {
  if (goal === 0) return -1
  return xp / goal
}