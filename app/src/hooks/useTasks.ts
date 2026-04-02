import { useEffect, useState } from "react"
import { createTask, type Task } from "../types/Task"
import { type Reward } from "../types/Reward"
import { createPurchase, type Purchase } from "../types/Purchase"
import { taskRepository } from "../repository"
import { calculateLevel } from "../utils/taskHelpers"
import { RANK_TITLES } from "../utils/rankTitles"
import useAuthContext from "../context/AuthContext"
import useAccountContext from "../context/AccountContext"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [purchase, setPurchase] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [points, setPoints] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const { user, loading: isLoadingAuth } = useAuthContext()
  const { account, saveBalance, saveXP } = useAccountContext()

  const goal = 20;

  /*   const getPoints = () => {
      setPoints(calculatePoints(tasks))
      return points
    } */

  const getLevel = () => {
    return calculateLevel(account?.experience || 0, goal)
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
    saveXP(points)
    saveBalance(points)
    setPoints(0)
    setTasks((prev) => {
      return prev.filter((p) => p.status != "completed")
    })
    setShowCelebration(false)
  }

  /*   const toggleStatus = (taskId: string) => {
      setTasks((prev) =>
        prev.map((p) =>
          p.id === taskId ? { ...p, status: p.status === "completed" ? "notStarted" : "completed" } : p,
        ),
      )
    } */

  const toggleStatus = (taskId: string) => {
    // 1. Hitta uppgiften direkt i nuvarande 'tasks' (utanför setState)
    const taskToToggle = tasks.find(t => t.id === taskId);
    if (!taskToToggle) return;

    const isCompleting = taskToToggle.status !== "completed";
    const pointChange = isCompleting ? 10 : -10;

    // 2. Uppdatera tasks
    setTasks((prev) => prev.map((task) => {
      if (task.id === taskId) {
        const isCompleting = task.status !== "completed";
        
        return {
          ...task,
          status: isCompleting ? "completed" : "notStarted",
          completedAt: isCompleting ? new Date() : null
        };
      }
      return task;
    }));
    
    updatePoints(pointChange)
    
  };

  const updatePoints = (pointChange: number) => {
    setPoints((prevPoints) => {
      const newPoints = Math.max(0, prevPoints + pointChange);

      if (newPoints >= goal && !showCelebration) {
        setShowCelebration(true);
      }

      return newPoints;
    });
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

    const saveData = async () => {
      if (user)
        try {
          await taskRepository.storeTasks(tasks)
          await taskRepository.storePurchase(purchase, user?.uid)
        } catch (err) {
          console.error("Bakgrundssparande misslyckades:", err)
        }
    }

    saveData()
  }, [tasks, purchase, isLoading])

  return {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    points,
    clearTasks,
    // eslint-disable-next-line react-hooks/refs
    level: getLevel(),
    // eslint-disable-next-line react-hooks/refs
    title: getTitle(),
    goal,
    purchaseItem,
    purchase,
    isLoading,
    showCelebration,
    setShowCelebration,
  }
}
