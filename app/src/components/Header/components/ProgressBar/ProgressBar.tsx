import type { RefObject } from "react"
import "./ProgressBar.css"

interface ProgressBarProps {
  points: number
  goal: RefObject<number>
}

const ProgressBar = (props: ProgressBarProps) => {
  const { points, goal } = props
  const percentage = (points / goal.current) * 100

  return (
    <div className="progress-bar-container">
      <div className="score-display">
        <div key={points} className="score-display score-pop">
          Poäng: {points}
        </div>
        <div>Nästa nivå: {goal.current}</div>
      </div>
      <div className="progress-outer">
        <div
          className="progress-inner"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
