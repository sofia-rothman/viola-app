import { useEffect, useRef, useState } from "react"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"
import { calculateLevel, calculatePoints } from "../utils/taskHelpers"
import { RANK_TITLES } from "../utils/rankTitles"
import useAuthContext from "../context/AuthContext"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalXP, setTotalXP] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { user, loading: isLoadingAuth } = useAuthContext()

  const goal = useRef(20)

  const getPoints = () => {
    return calculatePoints(tasks)
  }

  const getLevel = () => {
    return calculateLevel(totalXP, goal.current)
  }

  const getTitle = () => {
    const index = Math.floor(getLevel())
    if (index < 0) return
    return index < 22 ? RANK_TITLES[index] : RANK_TITLES[RANK_TITLES.length - 1]
  }

  const addTask = (title: string) => {
    const taskTemp: Task | null = createTask(title)

    if (taskTemp) {
      taskTemp.creator = user?.uid || ""
      taskTemp.assignee = user?.uid || ""
      if (tasks?.length > 0) {
        setTasks((prev) => [...prev, taskTemp])
      } else {
        setTasks([taskTemp])
      }
    }
  }

  const deleteTask = (taskId: string) => {
    const taskTemp = tasks.filter((task) => task.id !== taskId)
    setTasks(taskTemp)
  }

  const clearTasks = () => {
    setTotalXP((prev) => prev + getPoints())
    setBalance((prev) => prev + getPoints())
    setTasks((prev) => {
      return prev.filter((p) => p.status !== "completed")
    })
  }

  const toggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((p) =>
        p.id === taskId ? { ...p, status: p.status === "completed" ? "notStarted" : "completed" } : p,
      ),
    )
  }

  const purchaseItem = (item: Reward) => {
    if (item.price > balance) {
      return false
    }
    const purchasedItem = createPurchase(item)
    setBalance((prev) => prev - item.price)
    setPurchase((prev) => [...prev, purchasedItem])
  }

  /* SAVE TO FIRESTORE */
  const saveTask = () => {
    
  }

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      const fetchData = async () => {
        try {
         /*  const [tasks, balance, XPpoints, purchase] = await Promise.all([
            taskRepository.fetchTasks(user.uid),
            taskRepository.fetchBalance(user.uid),
            taskRepository.fetchXPpoints(user.uid),
            taskRepository.fetchPurchase(user.uid),
          ])

          console.log("tasks: " + tasks)

          setTasks(tasks || [])
          setBalance(balance || 0)
          setTotalXP(XPpoints || 0)
          setPurchase(purchase || [])
          setHasLoaded(true) */

          const [tasks] = await Promise.all([
            taskRepository.fetchTasks(user.uid),
          ])

          console.log("tasks: " + tasks)

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
  }, [user, isLoadingAuth, hasLoaded])

   useEffect(() => {
    if (isLoading || !hasLoaded || isLoadingAuth) return

    const saveData = async () => {
      if (user)
        try {
          await taskRepository.storeTasks(tasks)
          await taskRepository.storeBalance(balance, user?.uid)
          await taskRepository.storeXPpoints(totalXP, user?.uid)
          await taskRepository.storePurchase(purchase, user?.uid)
        } catch (err) {
          console.error("Bakgrundssparande misslyckades:", err)
        }
    }

    saveData()
  }, [tasks, balance, totalXP, purchase, isLoading]) 

  return {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    points: getPoints(),
    clearTasks,
    // eslint-disable-next-line react-hooks/refs
    level: getLevel(),
    // eslint-disable-next-line react-hooks/refs
    title: getTitle(),
    goal,
    balance,
    purchaseItem,
    purchase,
    totalXP,
    isLoading,
  }
}
