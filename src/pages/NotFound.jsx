import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-32 text-center">
      <p className="font-display text-7xl text-stone-200 dark:text-stone-800 mb-6">404</p>
      <h2 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">Page not found</h2>
      <p className="text-stone-500 dark:text-stone-400 mb-8">This verse hasn't been written yet.</p>
      <Link
        to="/"
        className="px-5 py-2.5 rounded-lg text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  )
}