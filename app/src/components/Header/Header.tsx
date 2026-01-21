import useTaskContext from "../../context/TaskContext"
import "./Header.css"
import CrownIcon from "../../../../app/src/assets/crown.svg?react"
import StatCard from "./components/StatCard/StatCard"
import ProgressBar from "./components/ProgressBar/ProgressBar"

const Header = () => {
  const tasks = useTaskContext()

  return (
    <div className="header">
      <div className="user-stats-card">
        <h2 className="name">
          Bonnie <CrownIcon />
        </h2>

        <div className="level">
          {tasks.title} • Level: {tasks.level}{" "}
        </div>

        <ProgressBar points={tasks.points} goal={tasks.goal} />

        <div>
          <div className="stat-card-container">
            <StatCard
              icon={"wallet"}
              label={"Plånbok"}
              value={`${tasks.balance} kr`}
            />

            <StatCard icon={"star"} label={"XP"} value={`${tasks.totalXP}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
