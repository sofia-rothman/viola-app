import { useEffect, useRef, useState } from "react"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalXP, setTotalXP] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState("")

  const goal = useRef(20)
  const title = [
    "Sysselsafari",
    "Junior-fixare",
    "Hemmets Hjälte",
    "Ordningsexpert",
    "Guldstjärne-mästare",
    "Legendarisk Fixar-drottning",
  ]

  const getPoints = () => {
    if (tasks && tasks.length > 0) {
      const completedTasks = tasks.filter((task) => task.completed)
      return completedTasks.length * 10
    } else return 0
  }

  const getLevel = () => {
    return totalXP / goal.current
  }

  const getTitle = () => {
    const index = Math.floor(getLevel())
    return index < 6 ? title[index] : title[title.length - 1]
  }

  const addTask = (title: string) => {
    const taskTemp: Task | null = createTask(title)

    if (taskTemp) {
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
      return prev.filter((p) => p.completed === false)
    })
  }

  const toggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((p) =>
        p.id === taskId ? { ...p, completed: !p.completed } : p,
      ),
    )
  }

  const toggleApproved = (taskId: string) => {
    setTasks((prev) =>
      prev.map((p) =>
        p.id === taskId ? { ...p, isApproved: !p.isApproved } : p,
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

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      setError("")

      try {
        const [tasks, balance, XPpoints, purchase] = await Promise.all([
          taskRepository.getTasks(),
          taskRepository.getBalance(),
          taskRepository.getXPpoints(),
          taskRepository.getPurchase(),
        ])

        setTasks(tasks || [])
        setBalance(balance || 0)
        setTotalXP(XPpoints || 0)
        setPurchase(purchase || [])
        setHasLoaded(true)
      } catch (err) {
        console.error("Hämtning misslyckades:", err)
        setError("Kunde inte hämta din sparade data.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isLoading || !hasLoaded) return

    const saveData = async () => {
      try {
        await Promise.all([
          taskRepository.saveTasks(tasks),
          taskRepository.saveBalance(balance),
          taskRepository.saveXPpoints(totalXP),
          taskRepository.savePurchase(purchase),
        ])
      } catch (err) {
        console.error("Bakgrundssparande misslyckades:", err)
        setError("Kunde inte spara ändringar tillfälligt.")
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
    toggleApproved,
  }
}
