import confetti from "canvas-confetti"
import "./CelebrationModal.css"
import { useEffect } from "react"
import useTaskContext from "../../context/TaskContext"

const CelebrationModal = () => {
  const tasks = useTaskContext()

  useEffect(() => {
    confetti({
      particleCount: 500,
      spread: 100,
      startVelocity: 80,
      ticks: 300,
      origin: { y: 0.7 },
    })
  }, [])

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>⭐️ Mål uppnått ⭐️</h3>
        <h2>Bra Jobbat!</h2>
        <h3>
          Du har nått dina mål för dagen. Fortsätt så här för att hålla sviten
          vid liv!
        </h3>
        <button className="close-button" onClick={tasks.clearTasks}>
          Stäng
        </button>
      </div>
    </div>
  )
}

export default CelebrationModal
