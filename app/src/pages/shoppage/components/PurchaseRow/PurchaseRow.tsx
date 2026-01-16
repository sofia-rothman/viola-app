import type { Purchase } from "../../../../types/Purchase"
import "./PurchaseRow.css"

interface PurchaseRowProps {
  item: Purchase
}

const PurchaseRow = (props: PurchaseRowProps) => {
  const { item } = props
  // const [date, setDate] = useState("")

  const dateFormatted = () => {
    return item.dateOfPurchase.toLocaleDateString()
  }

  return (
    <div className="my-rewards-item">
      <div>
        <div>{item.title}</div>
        <div>{dateFormatted()}</div>
      </div>
      <div>Redo att användas ✅</div>
    </div>
  )
}

export default PurchaseRow
