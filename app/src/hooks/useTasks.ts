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
      console.log("POINTS: " + completedTasks.length * 10)
      return completedTasks.length * 10
    }
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
    console.log("trying too add task: " + taskTemp)

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
    console.log("in toggle status: " + taskId)
    setTasks((prev) =>
      prev.map((p) => (p.id === taskId ? { ...p, completed: !p.completed } : p))
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
    const fetchData = async () => {
      setIsLoading(true)
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
    if (isLoading) return

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

  /*   useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        setIsLoading(true)

        try {
          await taskRepository.saveTasks(tasks)
        } catch (err) {
          setError("Kunde inte spara data... " + err)
        } finally {
          setIsLoading(false)
        }
      }

      saveData()
    }
  }, [tasks])

  useEffect(() => {
    console.log("saving XP: " + totalXP)

    if (!isLoading) {
      const saveData = async () => {
        setIsLoading(true)

        try {
          await taskRepository.saveXPpoints(totalXP)
        } catch (err) {
          setError("Kunde inte spara data... " + err)
        } finally {
          setIsLoading(false)
        }
      }

      saveData()
    }
  }, [totalXP])

  useEffect(() => {
    console.log("saving balance: " + balance)

    if (!isLoading) {
      const saveData = async () => {
        setIsLoading(true)

        try {
          await taskRepository.saveBalance(balance)
        } catch (err) {
          setError("Kunde inte spara data... " + err)
        } finally {
          setIsLoading(false)
        }
      }

      saveData()
    }
  }, [balance])

  useEffect(() => {
    console.log("saving purchase: " + purchase)

    if (!isLoading) {
      const saveData = async () => {
        setIsLoading(true)

        try {
          await taskRepository.savePurchase(purchase)
        } catch (err) {
          setError("Kunde inte spara data... " + err)
        } finally {
          setIsLoading(false)
        }
      }

      saveData()
    }
  }, [purchase]) */

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
