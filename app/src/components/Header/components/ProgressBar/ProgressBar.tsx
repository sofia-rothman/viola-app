import "./ProgressBar.css"

interface ProgressBarProps {
  points: number
  goal: number
}

/** Shows current level progress as both text and a visual meter. */
const ProgressBar = (props: ProgressBarProps) => {
  const { points, goal } = props
  const percentage = (points / goal) * 100

  return (
    <div className="progress-bar-container">
      <div className="score-display">
        <div key={points} className="score-display score-pop">
          Poäng: {points}
        </div>
        <div>Nästa mål: {goal}</div>
      </div>
      <div className="progress-outer">
        <div className="progress-inner" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar
