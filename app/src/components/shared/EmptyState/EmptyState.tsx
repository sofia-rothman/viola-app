import smiley from "./../../../assets/funny-emoji.svg"
import "./EmptyState.css"

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      Inga sysslor kvar – dags att leka!
      <img src={smiley} />
    </div>
  )
}

export default EmptyState
