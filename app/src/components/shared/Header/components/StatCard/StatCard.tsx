/* import WalletIcon from "../../../../../app/src/assets/wallet.svg?react"
import StarIcon from "../../../../app/src/assets/star.svg?react" */
import "./StatCard.css"

interface StatCardProps {
  icon: string
  label: string
  value: string
}

const StatCard = (props: StatCardProps) => {
  const { icon, value, label } = props

  return (
    <div className="stat-card">
      <div className="stat-card__icon-wrapper">{icon}</div>
      <div className="stat-card__content">
        <div className="stat-card__label">{label}</div>
        <span className="stat-card__value">{value}</span>
      </div>
    </div>
  )
}

export default StatCard
