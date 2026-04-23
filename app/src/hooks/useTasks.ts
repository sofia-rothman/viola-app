import { useEffect, useState } from "react"
import { createTask, type Task, type TaskStatus } from "../types/Task"
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
  const { account, saveBalance, saveXP, savePoints } = useAccountContext()

  const goal = 20;

  const getLevel = () => {
    return calculateLevel(account?.experience || 0, goal)
  }

  const getTitle = () => {
    const index = Math.floor(getLevel())
    if (index < 0) return
    return index < 22 ? RANK_TITLES[index] : RANK_TITLES[RANK_TITLES.length - 1]
  }

  const addTask = (title: string) => {
    const taskTemp = createTask(title)

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
    setPoints(0)
    setShowCelebration(false)
  }

  const toggleStatus = (taskId: string) => {
    const taskToToggle = tasks.find(t => t.id === taskId)
    if (!taskToToggle) return;
    const newState = getNextTaskState(taskToToggle.status)
    updateStatus(taskId, newState!)
    updatePoints(newState!.points)
  }

  const getNextTaskState = (currentStatus: TaskStatus) => {
    switch (currentStatus) {
      case "notStarted":
        return { status: "completed" as TaskStatus, points: 10 };
      case "pending":
        return { status: "completed" as TaskStatus, points: 10, completedAt: new Date() };
      case "completed":
        return { status: "pending" as TaskStatus, points: -10 };
    }
  }

  const updateStatus = (taskId: string, newState: { status: TaskStatus, completedAt?: Date }) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newState.status, completedAt: newState.completedAt ? newState.completedAt : null };
      }
      return task;
    }))
  }

  const updatePoints = (pointChange: number) => {
    setPoints((prevPoints) => {
      const newPoints = Math.max(0, prevPoints + pointChange);
      
      if (newPoints >= goal && !showCelebration) {
        setShowCelebration(true);
        return 0;
      }

      return newPoints;
    });
  }

  const savePointsToAccount = () => {
    saveBalance(10)
    saveXP(10)
  }

  const archiveTask = (taskId: string) => {
    const taskToArchive = tasks.find(t => t.id === taskId);
    
    if (!taskToArchive) return;

    savePointsToAccount()

    setTasks((prev) => prev.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: "archived",
          approvedAt: new Date(),
        };
      }
      return task;
    }))
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
    goal,
    purchaseItem,
    purchase,
    isLoading,
    showCelebration,
    setShowCelebration,
  }
}
