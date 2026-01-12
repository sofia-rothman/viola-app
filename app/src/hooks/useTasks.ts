import { useEffect, useRef, useState } from "react"
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../utils/localstorage"
import { createTask, type Task } from "../types/Task"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = getDataFromLocalStorage("tasks")
    return data ? data : []
  })
  const [totalXP, setTotalXP] = useState<number>(() => {
    const data = getDataFromLocalStorage("XPpoints")
    return data ? Number.parseInt(data) : 0
  })
  const [balance, setBalance] = useState<number>(() => {
    const data = getDataFromLocalStorage("balance")
    return data ? Number.parseInt(data) : 0
  })
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    const data = getDataFromLocalStorage("items")
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

  const purchaseItem = (price: number, title: string) => {
    if (price > balance) {
      return false
    }
    setBalance((prev) => prev - price)
    setPurchasedItems((prev) => [...prev, title])
  }

  useEffect(() => {
    saveDataToLocalStorage("tasks", tasks)
  }, [tasks])

  useEffect(() => {
    saveDataToLocalStorage("XPpoints", undefined, totalXP)
  }, [totalXP])

  useEffect(() => {
    saveDataToLocalStorage("balance", undefined, balance)
  }, [balance])

  useEffect(() => {
    saveDataToLocalStorage("items", undefined, undefined, purchasedItems)
  }, [purchasedItems])

  return {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    points: getPoints(),
    clearTasks,
    level: getLevel(),
    title: getTitle(),
    goal,
    balance,
    purchaseItem,
    purchasedItems,
    totalXP,
  }
}
