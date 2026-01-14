import { useState } from "react"
import "./TaskInput.css"
import useTaskContext from "../../../../context/TaskContext"

const TaskInput = () => {
  const tasks = useTaskContext()
  const [title, setTitle] = useState("")

  const handleClick = () => {
    tasks.addTask(title)
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
