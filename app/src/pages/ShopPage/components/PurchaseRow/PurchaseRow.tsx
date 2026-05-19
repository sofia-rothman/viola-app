import type { Purchase } from "../../../../types/Purchase"
import "./PurchaseRow.css"

interface PurchaseRowProps {
  item: Purchase
}

/** Shows a purchased reward with its purchase date. */
const PurchaseRow = (props: PurchaseRowProps) => {
  const { item } = props
  const dateFormatted = item.dateOfPurchase?.toLocaleDateString()

  return (
    <div className="my-rewards-item">
      <div>
        <div>{item.title}</div>
        <div>{dateFormatted}</div>
      </div>
      <div>Redo att användas ✅</div>
    </div>
  )
}

export default PurchaseRow
