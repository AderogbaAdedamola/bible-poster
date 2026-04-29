// src/pages/Home.jsx
import { Link } from "react-router-dom"
import { BookText, Palette, Share2 } from "lucide-react"
import Logo from "../components/Logo"
import VersePicker from "../components/VersePicker"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center gap-8">

      {/* Hero */}
      <div className="flex flex-col items-center gap-6">
        <Logo size={56} showText={false} className="text-stone-900 dark:text-stone-100" />
        <h1 className="font-display text-5xl sm:text-6xl font-semibold text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
          Turn Scripture into<br />
          <span className="text-amber-600 dark:text-amber-400">beautiful posters</span>
        </h1>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
          Pick a verse from any Bible version, style it your way, and share it with the world.
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link
          to="/editor"
          className="px-6 py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all"
        >
          Create a poster
        </Link>
        <Link
          to="/editor"
          className="px-6 py-3 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
        >
          See examples
        </Link>
      </div>

      {/* Placeholder feature grid — we'll flesh this out later */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
        {[
          { icon: <BookText size={22} className="text-amber-600 dark:text-amber-400" />, title: "Every version", desc: "KJV, NIV, ESV, NLT, AMP, MSG and more via the Bible API." },
          { icon: <Palette size={22} className="text-amber-600 dark:text-amber-400" />, title: "Full customisation", desc: "Backgrounds, fonts, layouts — make every poster yours." },
          { icon: <Share2 size={22} className="text-amber-600 dark:text-amber-400" />, title: "Share instantly", desc: "One link. Rich social previews. Download as PNG." },
        ].map((f) => (
          <div
            key={f.title}
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
          >
            <div className="mb-3">{f.icon}</div>
            <p className="font-medium text-stone-900 dark:text-stone-100 mb-1">{f.title}</p>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}