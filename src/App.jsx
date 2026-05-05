import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Editor from "./pages/Editor"
import PosterView from "./pages/PosterView"
import NotFound from "./pages/NotFound"
import { useFonts } from "./hooks/useFonts"

export default function App() {
  useFonts();
  
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/create"  element={<Create />} />
          <Route path="/editor"  element={<Editor />} />
          <Route path="/v"       element={<PosterView />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}