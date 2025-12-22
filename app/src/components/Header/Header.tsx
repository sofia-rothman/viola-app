import "./Header.css"

interface HeaderProps {
  points: number
  level: number
  title: string
  goal: React.RefObject<number>
}

const Header = (props: HeaderProps) => {
  const { points, level, title, goal } = props

  return (
    <div className="header">
      <div>Bonnie {title}</div>
      <div>Level: {level}</div>
      <div>
        <div key={points} className="score-display score-pop">
          {points} ⭐️
        </div>
        <progress
          className="progress-bar"
          value={points && points / goal.current}
        />
      </div>
    </div>
  )
}

export default Header
