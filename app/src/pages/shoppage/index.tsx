import { useEffect, useState } from "react"
import useTaskContext from "../../context/TaskContext"
import { rewards } from "../../data/rewards"
import ShopItem from "./ShopItem/ShopItem"
import "./ShopPage.css"

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

    // 4. Cleanup-funktion (Viktigast!)
    return () => clearInterval(timer)
  }, [taskContext.balance])

  return (
    <div className="shop-container">
      Du har {displayBalance} ⭐️ att handla för
      <div className="shop-grid">
        {rewards.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
      <div>Mina Belöningar</div>
      <div className="my-rewards-list">
        {taskContext.purchasedItems.map((item) => (
          <div className="my-rewards-item">
            <div>{item}</div>
            <div>Redo att användas ✅</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopPage
