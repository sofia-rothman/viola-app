import { useState } from "react"
import "./TaskInput.css"

interface TaskInputProps {
  saveInput: (title: string) => void
}

const TaskInput = (props: TaskInputProps) => {
  const { saveInput } = props
  const [title, setTitle] = useState("")

  const handleClick = () => {
    saveInput(title)
    setTitle("")
  }

  return (
    <div className="input-container">
      <input
        className="input"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className="button-wrapper">
        <button
          className="add-button"
          type="submit"
          onClick={() => handleClick()}
        >
          Lägg till
        </button>
      </div>
    </div>
  )
}

export default TaskInput
