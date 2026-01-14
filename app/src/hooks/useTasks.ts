import { useEffect, useRef, useState } from "react"
import { storage } from "../utils/localstorage"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = storage.get<Task[]>("tasks")
    return data ? data : []
  })
  const [totalXP, setTotalXP] = useState<number>(() => {
    const data = storage.get<number>("XPpoints")
    return data ? data : 0
  })
  const [balance, setBalance] = useState<number>(() => {
    const data = storage.get<number>("balance")
    return data ? data : 0
  })
  const [purchase, setPurchase] = useState<Purchase[]>(() => {
    const data = storage.get<Purchase[]>("items")
    return data ? data : []
  })

  const goal = useRef(20)
  const title = [
    "Sysselsafari 🐾",
    "Junior-fixare 🛠️",
    "Hemmets Hjälte 🦸‍♀️",
    "Ordningsexpert ✨",
    "Guldstjärne-mästare 🌟",
    "Legendarisk Fixar-drottning 👑",
  ]

  const getPoints = () => {
    const completedTasks = tasks.filter((task) => task.completed)
    return completedTasks.length * 10
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
      setTasks((prev) => [...prev, taskTemp])
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
    storage.save<Task[]>("tasks", tasks)
  }, [tasks])

  useEffect(() => {
    storage.save<number>("XPpoints", totalXP)
  }, [totalXP])

  useEffect(() => {
    storage.save<number>("balance", balance)
  }, [balance])

  useEffect(() => {
    storage.save<Purchase[]>("items", purchase)
  }, [purchase])

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
  }
}
