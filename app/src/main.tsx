import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { TaskProvider } from "./context/TaskProvider.tsx"
import { AccountProvider } from "./context/AccountProvider.tsx"
import { AuthProvider } from "./context/AuthProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <AccountProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </AccountProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
