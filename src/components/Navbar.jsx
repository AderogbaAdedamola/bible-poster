// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, BookOpen } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import Logo from "./Logo"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo size={28} showText={true} className="text-stone-900 dark:text-stone-100" />
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/" active={isActive("/")}>
            Home
          </NavLink>
          <NavLink to="/editor" active={isActive("/editor")}>
            Create
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="
              w-9 h-9 rounded-lg flex items-center justify-center
              text-stone-500 hover:text-stone-900
              dark:text-stone-400 dark:hover:text-stone-100
              hover:bg-stone-100 dark:hover:bg-stone-800
              transition-all duration-200
            "
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CTA */}
          <Link
            to="/editor"
            className="
              hidden sm:inline-flex items-center gap-1.5
              px-4 py-2 rounded-lg text-sm font-medium
              bg-stone-900 text-white
              dark:bg-stone-100 dark:text-stone-900
              hover:bg-stone-700 dark:hover:bg-white
              transition-all duration-200
            "
          >
            <BookOpen size={15} />
            Create poster
          </Link>
        </div>
      </div>
    </header>
  )
}

// Internal NavLink helper
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`
        px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
        ${active
          ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
          : "text-stone-500 hover:text-stone-900 hover:bg-stone-50 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800/60"
        }
      `}
    >
      {children}
    </Link>
  )
}