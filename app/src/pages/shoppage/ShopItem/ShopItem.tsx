import useTaskContext from "../../../context/TaskContext"
import "./ShopItem.css"

interface ShopItemProps {
  title: string
  price: number
}

const ShopItem = (props: ShopItemProps) => {
  const { title, price } = props
  const taskContext = useTaskContext()

  const handleClick = () => {
    taskContext.purchaseItem(price, title)
  }

  return (
    <div className="item-container">
      {title} Pris: {price} poäng
      <button onClick={handleClick}>KÖP</button>
    </div>
  )
}

export default ShopItem
