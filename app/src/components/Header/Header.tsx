import useTaskContext from "../../context/TaskContext"
import "./Header.css"
import StarIcon from "../../../../app/src/assets/star.svg?react"
import WalletIcon from "../../../../app/src/assets/wallet.svg?react"
import CrownIcon from "../../../../app/src/assets/crown.svg?react"

const Header = () => {
  const tasks = useTaskContext()
  const percentage = (tasks.points / tasks.goal.current) * 100

  return (
    <div className="header">
      <div className="user-stats-card">
        <h2 className="name">
          Bonnie <CrownIcon />
        </h2>
        <div className="level">
          {tasks.title} • Level: {tasks.level}{" "}
        </div>
        <div className="progress-bar-container">
          <div key={tasks.points} className="score-display score-pop"></div>
          <div className="score-display">
            <div>Poäng: {tasks.points}</div>
            <div>Nästa nivå: {tasks.goal.current}</div>
          </div>
          <div className="progress-outer">
            <div
              className="progress-inner"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="stat-card-container">
            <div className="stat-card">
              <div className="stat-card__icon-wrapper">
                <WalletIcon />
              </div>
              <div className="stat-card__content">
                <div className="stat-card__label">Plånbok</div>
                <span className="stat-card__value">{tasks.balance} kr</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon-wrapper">
                <StarIcon />
              </div>
              <div className="stat-card__content">
                <span className="stat-card__label">XP</span>
                <span className="stat-card__value">{tasks.totalXP}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
