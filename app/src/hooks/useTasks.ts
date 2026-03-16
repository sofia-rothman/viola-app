import { useEffect, useRef, useState } from "react"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"
import { calculateLevel, calculatePoints } from "../utils/taskHelpers"
import { useAuth } from "./useAuth"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalXP, setTotalXP] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { user, loading: authLoading } = useAuth()
  

  const goal = useRef(20)
  const RANK_TITLES: string[] = [
    "Dammråtte-tämjare",          
    "Pryl-pionjär",             
    "Småfixar-smurfen",         
    "Kaos-kontrollant",         
    "Städ-lärling",             
    "Slipp-stök-strateg",        
    "Proffs-putsare",           
    "Städ-ninja",               
    "Hemmets Högra Hand",       
    "Fixar-fantom",              
    "Fixar-drottning",           
    "Ordningens Väktare",        
    "Struktur-stjärna",          
    "Glans-general",             
    "Hushållets Hjärta",         
    "Magisk Miljö-skapare",      
    "Ordningens Överstepräst",    
    "Guldputs-guvernör",         
    "Fixar-fenomen",             
    "Suverän Syssle-specialist",  
    "Universums Fixar-fyrstinna", 
    "Intergalaktisk Ordningsexpert",
    "Odödlig Fixar-legend 🏆"     
  ];

  const getPoints = () => {
    return calculatePoints(tasks)
  }

  const getLevel = () => {
    return calculateLevel(totalXP, goal.current)
  }
  
  const getTitle = () => {
    const index = Math.floor(getLevel())
    if(index < 0) return
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
    if(user) {
      setIsLoading(true)
      const fetchData = async () => {
        try {
          const [tasks, balance, XPpoints, purchase] = await Promise.all([
            taskRepository.getTasks(user.uid),
            taskRepository.getBalance(user.uid),
            taskRepository.getXPpoints(user.uid),
            taskRepository.getPurchase(user.uid),
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
    }
  }, [, authLoading])

  useEffect(() => {
    if (isLoading || !hasLoaded) return

    const saveData = async () => {
      if (user)
      try {
        await Promise.all([
          taskRepository.saveTasks(tasks, user?.uid),
          taskRepository.saveBalance(balance, user?.uid),
          taskRepository.saveXPpoints(totalXP, user?.uid),
          taskRepository.savePurchase(purchase, user?.uid),
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
