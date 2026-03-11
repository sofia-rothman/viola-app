import { useEffect, useRef, useState } from "react"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"
import { calculateLevel, calculatePoints } from "../utils/taskHelpers"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalXP, setTotalXP] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const goal = useRef(20)
  const RANK_TITLES: string[] = [
    "Dammråtte-tämjare",           // Level 1 (Index 0)
    "Pryl-pionjär",               // Level 2
    "Småfixar-smurfen",           // Level 3
    "Kaos-kontrollant",           // Level 4
    "Städ-lärling",               // Level 5
    "Slipp-stök-strateg",          // Level 6
    "Proffs-putsare",             // Level 7
    "Städ-ninja",                 // Level 8
    "Hemmets Högra Hand",         // Level 9
    "Fixar-fantom",               // Level 10
    "Fixar-drottning",            // Level 11
    "Ordningens Väktare",         // Level 12
    "Struktur-stjärna",           // Level 13
    "Glans-general",              // Level 14
    "Hushållets Hjärta",          // Level 15
    "Magisk Miljö-skapare",       // Level 16
    "Ordningens Överstepräst",     // Level 17
    "Guldputs-guvernör",          // Level 18
    "Fixar-fenomen",              // Level 19
    "Suverän Syssle-specialist",   // Level 20
    "Universums Fixar-fyrstinna",  // Level 21
    "Intergalaktisk Ordningsexpert",// Level 22 
    "Odödlig Fixar-legend 🏆"      // Level 23+ (index 22)
  ];

  const getPoints = () => {
    return calculatePoints(tasks)
  }

  const getLevel = () => {
    return calculateLevel(totalXP, goal.current)
  }

  const getTitle = () => {
    const index = Math.floor(getLevel())
    return index < 22 ? RANK_TITLES[index] : RANK_TITLES[RANK_TITLES.length - 1]
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
