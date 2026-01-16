import { useEffect, useState } from "react"
import useTaskContext from "../../context/TaskContext"
import { rewards } from "../../data/rewards"
import "./ShopPage.css"
import PurchaseRow from "./components/PurchaseRow/PurchaseRow"
import RewardCard from "./components/RewardCard/RewardCard"

const ShopPage = () => {
  const taskContext = useTaskContext()
  const [displayBalance, setDisplayBalance] = useState(taskContext.balance)

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayBalance((prev) => {
        const target = taskContext.balance

        if (prev === target) {
          clearInterval(timer)
          return prev
        }

        return prev < target ? prev + 1 : prev - 1
      })
    }, 70)

    return () => clearInterval(timer)
  }, [taskContext.balance])

  return (
    <div className="shop-container">
      Du har {displayBalance} ⭐️ att handla för
      <div className="shop-grid">
        {rewards.map((item) => (
          <RewardCard key={item.id} item={item} />
        ))}
      </div>
      <div>Min köphistorik</div>
      <div className="my-rewards-list">
        {taskContext.purchase.map((item) => (
          <PurchaseRow key={item.instanceId} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ShopPage
