import { useState } from "react"
import ParentView from "../views/ParentView"
import KidsView from "../views/KidsView"

const DashboardPage = () => {
  const [userRole, setUserRole] = useState<"parent" | "kid">("kid")

  return (
    <div>
      <button
        onClick={() => setUserRole(userRole === "kid" ? "parent" : "kid")}
      >
        Växla till {userRole === "kid" ? "Förälder" : "Barn"}
      </button>

      {userRole === "parent" ? <ParentView /> : <KidsView />}
    </div>
  )
}

export default DashboardPage
