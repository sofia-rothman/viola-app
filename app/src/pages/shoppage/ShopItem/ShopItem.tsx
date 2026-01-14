import { useNavigate } from "react-router-dom"
import useTaskContext from "../../../context/TaskContext"
import "./ShopItem.css"
import { useState } from "react"
import type { Reward } from "../../../types/Reward"

interface ShopItemProps {
  item: Reward
}

const ShopItem = (props: ShopItemProps) => {
  const { item } = props
  const taskContext = useTaskContext()
  const [isPurchased, setIsPurchased] = useState(false)
  const navigate = useNavigate()

  const canAfford = taskContext.balance >= item.price

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
        className={`buy-button ${!canAfford && "disabled"} ${
          isPurchased && "success"
        }`}
        onClick={handleClick}
      >
        {isPurchased ? "Köpt! ✅" : canAfford ? "KÖP" : "Samla fler stjärnor"}
      </button>
    </div>
  )
}

export default ShopItem
