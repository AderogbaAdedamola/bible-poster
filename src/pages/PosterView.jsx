import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import PosterCanvas from "../components/PosterCanvas"

export default function PosterView() {
  const [params] = useSearchParams()

  const verse = {
    verseRef:        params.get("ref")   ?? "",
    verseText:       params.get("text")  ?? "",
    translationName: params.get("trans") ?? "",
  }

  const style = {
    bgIndex:       Number(params.get("bg"))    || 0,
    templateIndex: Number(params.get("tmpl"))  || 0,
    fontIndex:     Number(params.get("font"))  || 0,
    fontSize:      Number(params.get("size"))  || 20,
    textAlign:     params.get("align")         || "center",
  }

  const ogDesc = verse.verseText
    ? `${verse.verseText.slice(0, 120)}${verse.verseText.length > 120 ? "…" : ""}`
    : "A Bible verse poster from PostVerse"

  return (
    <>
      <Helmet>
        <title>{verse.verseRef ? `${verse.verseRef} — PostVerse` : "PostVerse"}</title>
        <meta property="og:title"       content={verse.verseRef || "PostVerse"} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="PostVerse" />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content={verse.verseRef || "PostVerse"} />
        <meta name="twitter:description" content={ogDesc} />
      </Helmet>

      <div className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">
            Shared via PostVerse
          </p>
          <h1 className="font-display text-2xl text-stone-900 dark:text-stone-100">
            {verse.verseRef}
          </h1>
        </div>

        <PosterCanvas
          verse={verse}
          style={style}
          className="w-full shadow-2xl shadow-stone-900/20 dark:shadow-stone-900/50"
        />

        <div className="flex gap-3 w-full">
          <Link
            to="/create"
            className="flex-1 text-center py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
          >
            Create your own
          </Link>
        </div>
      </div>
    </>
  )
}