import useTaskContext from "../../context/TaskContext"
import "./Header.css"

const Header = () => {
  const tasks = useTaskContext()

  return (
    <div className="header">
      <div>
        Bonnie {tasks.title} Level: {tasks.level}{" "}
      </div>
      <div>
        XP: {tasks.totalXP} Wallet: {tasks.balance}
      </div>
      <div>
        <div key={tasks.points} className="score-display score-pop">
          {tasks.points} ⭐️
        </div>
        <progress
          className="progress-bar"
          value={tasks.points && tasks.points / tasks.goal.current}
        />
      </div>
    </div>
  )
}

export default Header
