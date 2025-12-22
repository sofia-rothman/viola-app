import confetti from "canvas-confetti"
import "./CelebrationModal.css"
import { useEffect } from "react"

interface CelebrationModalProps {
  clearTasks: () => void
}

const CelebrationModal = (props: CelebrationModalProps) => {
  const { clearTasks } = props

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="goal">⭐️ Mål uppnått ⭐️</div>
        Bra Jobbat! <button onClick={clearTasks}>Stäng</button>
      </div>
    </div>
  )
}

export default CelebrationModal
