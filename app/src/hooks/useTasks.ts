import { useEffect, useState } from "react"
import { createTask, type Task, type TaskStatus } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"
import { calculateLevel } from "../utils/taskHelpers"
import { RANK_TITLES } from "../utils/rankTitles"
import useAuthContext from "../context/AuthContext"
import useAccountContext from "../context/AccountContext"

const POINTS_PER_LEVEL = 20
const POINTS_PER_COMPLETED_TASK = 10

interface TaskStateChange {
  status: TaskStatus
  points: number
  completedAt?: Date
}

/**
 * Coordinates task state, reward purchases, and account progress.
 *
 * This hook owns the persistence boundary for tasks so components can stay focused on UI actions.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [points, setPoints] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const { user, loading: isLoadingAuth } = useAuthContext()
  const { account, saveBalance, saveXP, savePoints } = useAccountContext()

  const getLevel = () => {
    return calculateLevel(account?.experience || 0, POINTS_PER_LEVEL)
  }

  const getTitle = () => {
    const index = Math.floor(getLevel())
    if (index < 0) return
    return index < 22 ? RANK_TITLES[index] : RANK_TITLES[RANK_TITLES.length - 1]
  }

  const addTask = (title: string) => {
    const newTask = createTask(title)

    if (newTask) {
      newTask.creator = user?.uid || ""
      newTask.assignee = user?.uid || ""
      if (tasks?.length > 0) {
        setTasks((prev) => [...prev, newTask])
      } else {
        setTasks([newTask])
      }
    }
  }

  const deleteTask = (taskId: string) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(remainingTasks)
  }

  const clearTasks = () => {
    setPoints(0)
    setShowCelebration(false)
  }

  const toggleStatus = (taskId: string) => {
    const taskToToggle = tasks.find((t) => t.id === taskId)
    if (!taskToToggle) return
    const newState = getNextTaskState(taskToToggle.status)
    if (!newState) return

    updateStatus(taskId, newState)
    updatePoints(newState.points)
  }

  const getNextTaskState = (currentStatus: TaskStatus): TaskStateChange | null => {
    switch (currentStatus) {
      case "notStarted":
        return { status: "completed", points: POINTS_PER_COMPLETED_TASK }
      case "pending":
        return {
          status: "completed",
          points: POINTS_PER_COMPLETED_TASK,
          completedAt: new Date(),
        }
      case "completed":
        return { status: "pending", points: -POINTS_PER_COMPLETED_TASK }
      default:
        return null
    }
  }

  const updateStatus = (taskId: string, newState: TaskStateChange) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newState.status,
            completedAt: newState.completedAt ? newState.completedAt : null,
          }
        }
        return task
      }),
    )
  }

  const updatePoints = (pointChange: number) => {
    setPoints((prevPoints) => {
      const newPoints = Math.max(0, prevPoints + pointChange)

      // The progress meter represents the current level only, so completing a level resets it.
      if (newPoints >= POINTS_PER_LEVEL && !showCelebration) {
        setShowCelebration(true)
        return 0
      }

      return newPoints
    })
  }

  const savePointsToAccount = () => {
    saveBalance(POINTS_PER_COMPLETED_TASK)
    saveXP(POINTS_PER_COMPLETED_TASK)
  }

  const archiveTask = (taskId: string) => {
    const taskToArchive = tasks.find((t) => t.id === taskId)

    if (!taskToArchive) return

    savePointsToAccount()

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: "archived",
            approvedAt: new Date(),
          }
        }
        return task
      }),
    )
  }

  const purchaseItem = (item: Reward) => {
    if (account && account.balance && item.price <= account.balance) {
      const purchasedItem = createPurchase(item)
      saveBalance(-item.price)
      setPurchase((prev) => [...prev, purchasedItem])
    } else {
      return false
    }
  }

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      const fetchData = async () => {
        try {
          const [tasks] = await Promise.all([taskRepository.fetchTasks(user.uid)])

          setTasks(tasks || [])
          setHasLoaded(true)
        } catch (err) {
          console.error("Hämtning misslyckades:", err)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [user, isLoadingAuth])

  useEffect(() => {
    if (isLoading || !hasLoaded || isLoadingAuth) return

    // Wait until the initial fetch has completed so cached tasks are not overwritten by defaults.
    const storeData = async () => {
      if (user)
        try {
          await taskRepository.storeTasks(tasks)
          //await taskRepository.storePurchase(purchase, user?.uid)
        } catch (err) {
          console.error("Bakgrundssparande misslyckades:", err)
        }
    }

    storeData()
  }, [tasks, purchase, isLoading])

  useEffect(() => {
    savePoints(points)
  }, [points])

  return {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    archiveTask,
    points,
    clearTasks,
    // eslint-disable-next-line react-hooks/refs
    level: getLevel(),
    // eslint-disable-next-line react-hooks/refs
    title: getTitle(),
    goal: POINTS_PER_LEVEL,
    purchaseItem,
    purchase,
    isLoading,
    showCelebration,
    setShowCelebration,
  }
}
