import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { TaskProvider } from "./context/TaskProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <TaskProvider>
        <App />
      </TaskProvider>
    </StrictMode>
  </BrowserRouter>
)
