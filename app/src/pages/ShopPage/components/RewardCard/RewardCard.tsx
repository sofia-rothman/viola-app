import { useNavigate } from "react-router-dom"
import useTaskContext from "../../../../context/TaskContext"
import "./RewardCard.css"
import { useState } from "react"
import type { Reward } from "../../../../types/Reward"
import useAccountContext from "../../../../context/AccountContext"

interface RewardCardProps {
  item: Reward
}

/** Renders a reward and handles either purchase feedback or redirecting back to tasks. */
const RewardCard = (props: RewardCardProps) => {
  const { item } = props
  const taskContext = useTaskContext()
  const { account } = useAccountContext()
  const [isPurchased, setIsPurchased] = useState(false)
  const navigate = useNavigate()

  const canAfford = account?.balance && account.balance >= item.price

  const handleClick = () => {
    if (canAfford) {
      taskContext.purchaseItem(item)
      setIsPurchased(true)

      setTimeout(() => {
        setIsPurchased(false)
      }, 2000)
    } else {
      navigate("/")
    }
  }

  return (
    <div className="shop-card">
      <div className="product-emoji">{item.emoji}</div>
      <div className="product-name">{item.title}</div>
      <div className="price-tag">Pris: {item.price} ⭐️</div>
      <button
        className={["buy-button", !canAfford ? "disabled" : "", isPurchased ? "success" : ""]
          .filter(Boolean)
          .join(" ")}
        onClick={handleClick}
      >
        {isPurchased ? "Köpt! ✅" : canAfford ? "KÖP" : "Samla fler stjärnor"}
      </button>
    </div>
  )
}

export default RewardCard
