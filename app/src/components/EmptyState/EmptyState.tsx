import smiley from "../../assets/funny-emoji.svg"
import "./EmptyState.css"

/** Encourages the child when there are no visible tasks left. */
const EmptyState = () => {
  return (
    <div className="empty-state-container">
      Inga sysslor kvar – dags att leka!
      <img src={smiley} />
    </div>
  )
}

export default EmptyState
