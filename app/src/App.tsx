import "./App.css"
import { useTasks } from "./hooks/useTasks"
import Header from "./components/Header/Header"
import CelebrationModal from "./components/CelebrationModal/CelebrationModal"
import TodoPage from "./pages/todopage/TodoPage"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import ShopPage from "./pages/shoppage/ShopPage"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/todo"
        element={
          <TodoPage
            addTask={addTask}
            tasks={tasks}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
          />
        }
      />
      <Route path="/shop" element={<ShopPage />} />
    </Route>
  )
)

function App() {
  const {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
    points,
    clearTasks,
    title,
    level,
    goal,
  } = useTasks()

  return (
    <>
      {points >= goal.current && <CelebrationModal clearTasks={clearTasks} />}
      <Header points={points} level={level} title={title} goal={goal} />
      <RouterProvider router={router} />
      <NavigationBar />
    </>
  )
}

export default App
