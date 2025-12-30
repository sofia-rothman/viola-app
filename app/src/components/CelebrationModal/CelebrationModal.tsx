import confetti from "canvas-confetti"
import "./CelebrationModal.css"
import { useEffect } from "react"
import useTaskContext from "../../context/TaskContext"

const CelebrationModal = () => {
  const tasks = useTaskContext()
  const isGoalReached = tasks.points >= tasks.goal.current

  useEffect(() => {
    if (isGoalReached) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isGoalReached])

  if (isGoalReached) {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="goal">⭐️ Mål uppnått ⭐️</div>
          Bra Jobbat! <button onClick={tasks.clearTasks}>Stäng</button>
        </div>
      </div>
    )
  }
}

export default CelebrationModal
