import type { Purchase } from "../../../../types/Purchase"
import "./PurchaseRow.css"

interface PurchaseRowProps {
  item: Purchase
}

const PurchaseRow = (props: PurchaseRowProps) => {
  const { item } = props
  return (
    <div className="my-rewards-item">
      <div>{item.title}</div>
      <div>Redo att användas ✅</div>
    </div>
  )
}

export default PurchaseRow
