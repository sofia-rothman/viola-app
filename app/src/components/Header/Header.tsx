import type { Task } from "../../types/Task"
import "./Header.css"

interface HeaderProps {
  points: number
  tasks: Task[]
}

const Header = (props: HeaderProps) => {
  const { points, tasks } = props

  return (
    <div className="header">
      <div>Bonnie Master</div>
      <div>Level: 1</div>
      <div>
        <div key={points} className="score-display score-pop">
          {points} ⭐️
        </div>
        <progress
          className="progress-bar"
          value={points && tasks ? points / tasks.length / 10 : 0}
        />
      </div>
    </div>
  )
}

export default Header
