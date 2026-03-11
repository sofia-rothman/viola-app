import { describe, it, expect } from 'vitest'
import { calculateLevel, calculatePoints } from '../utils/taskHelpers'
import type { Task } from '../types/Task'

describe('calculatePoints', () => {
  it('should return 0 for empty array', () => {
    expect(calculatePoints([])).toBe(0)
  })

  it('should return 0 for two uncompleted tasks', () => {
    const mockTasks = [{ completed: false }, { completed: false }] as Task[]
    expect(calculatePoints(mockTasks)).toBe(0)
  })

  it('should return 20 for two completed tasks', () => {
    const mockTasks = [{ completed: true }, { completed: true }] as Task[]
    expect(calculatePoints(mockTasks)).toBe(20)
  })

  it('should return 10 for two completed tasks', () => {
    const mockTasks = [{ completed: true }, { completed: false },{ completed: false }, { completed: false }] as Task[]
    expect(calculatePoints(mockTasks)).toBe(10)
  })
})

describe('calculateLevel', () => {
  it('should return -1 if goal is 0', () => {
    expect(calculateLevel(1, 0)).toBe(-1)
  })

  it('should return 0 if XP is 0', () => {
    expect(calculateLevel(0, 20)).toBe(0)
  })

  it('should return 15 if XP is 300 and goal is 20', () => {
    expect(calculateLevel(300, 20)).toBe(15)
  })
})