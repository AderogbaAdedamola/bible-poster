// src/pages/Home.jsx
import { Link } from "react-router-dom"
import { BookText, Palette, Share2, ArrowRight, Sparkles } from "lucide-react"
import Logo from "../components/Logo"

const FEATURES = [
  {
    icon: BookText,
    title: "Every translation",
    desc: "KJV, BSB, WEB, NET, ASV and more — fetched live, no account needed.",
  },
  {
    icon: Palette,
    title: "Full customisation",
    desc: "Gradient backgrounds, overlay templates, fonts, sizes — make it yours.",
  },
  {
    icon: Share2,
    title: "Share instantly",
    desc: "One shareable link with rich social previews. Download as PNG.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
          <Sparkles size={12} />
          Free · No account required
        </div>

        <h1 className="font-display text-5xl sm:text-7xl font-semibold text-stone-900 dark:text-stone-100 leading-tight tracking-tight max-w-2xl">
          Turn Scripture into{" "}
          <span className="text-amber-600 dark:text-amber-400 italic">
            beautiful posters
          </span>
        </h1>

        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
          Pick any Bible verse, style it with gorgeous backgrounds and fonts,
          then share it with the world in one tap.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all duration-200"
          >
            Create your poster
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
          >
            See how it works
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-stone-100 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                <Icon size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-stone-100 mb-1">{title}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-stone-100 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Ready to create?
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">
              Takes less than a minute. No sign-up, no cost.
            </p>
          </div>
          <Link
            to="/create"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all duration-200"
          >
            Get started
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}