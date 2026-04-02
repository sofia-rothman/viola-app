import useTaskContext from "../../context/TaskContext"
import "./Header.css"
import CrownIcon from "../../../../app/src/assets/crown.svg?react"
import StatCard from "./components/StatCard/StatCard"
import ProgressBar from "./components/ProgressBar/ProgressBar"
import UserMenu from "../UserMenu/UserMenu"
import useAccountContext from "../../context/AccountContext"

const Header = () => {
  const tasks = useTaskContext()
  const { account, loading: isLoadingAccount } = useAccountContext()

  if (isLoadingAccount ) return <div className="loader">Hämtar profil...</div>;

  return (
    <div className="header">
      <UserMenu/>
      
      {account && 
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
              value={`${account?.balance || 0} kr`}
            />

            <StatCard 
              icon={"star"} 
              label={"XP"} 
              value={`${account?.experience || 0}`} 
            />
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Header
