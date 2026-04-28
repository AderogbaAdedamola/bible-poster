// src/pages/PosterView.jsx
import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function PosterView() {
  const [params] = useSearchParams()
  const ref  = params.get("ref")  || "Unknown verse"
  const text = params.get("text") || ""

  return (
    <>
      <Helmet>
        <title>{ref} — PostVerse</title>
        <meta property="og:title"       content={ref} />
        <meta property="og:description" content={text} />
        <meta property="og:site_name"   content="PostVerse" />
        <meta name="twitter:card"       content="summary_large_image" />
      </Helmet>

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-stone-400 dark:text-stone-500 text-xs uppercase tracking-widest mb-6">Shared poster</p>
        <blockquote className="font-display text-2xl text-stone-900 dark:text-stone-100 leading-relaxed mb-4">
          "{text}"
        </blockquote>
        <p className="text-amber-600 dark:text-amber-400 font-medium">— {ref}</p>
      </div>
    </>
  )
}