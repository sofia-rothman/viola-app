import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { TaskProvider } from "./context/TaskProvider"
import { AccountProvider } from "./context/AccountProvider"
import { AuthProvider } from "./context/AuthProvider"

// Providers are nested by dependency: auth resolves first, then account, then task data.
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
  </BrowserRouter>,
)
