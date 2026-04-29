import "./StatCard.css"

interface StatCardProps {
  icon: string
  label: string
  value: string
}

/** Renders a compact labeled stat in the header. */
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
