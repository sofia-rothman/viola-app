import type { PurchasedReward } from "../../../types/Reward"
import "./PurchasedItem.css"

interface PurchasedItemProps {
  item: PurchasedReward
}

const PurchasedItem = (props: PurchasedItemProps) => {
  const { item } = props
  return (
    <div className="my-rewards-item" key={item.instanceId}>
      <div>{item.title}</div>
      <div>Redo att användas ✅</div>
    </div>
  )
}

export default PurchasedItem
