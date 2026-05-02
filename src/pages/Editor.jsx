import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlignLeft, AlignCenter, AlignRight,
  Download, Share2, ChevronLeft, Loader2
} from "lucide-react"
import { usePoster } from "../context/PosterContext"
import PosterCanvas from "../components/PosterCanvas"
import ShareModal from "../components/ShareModal"
import { BACKGROUNDS, TEMPLATES, POSTER_FONTS, TEXT_ALIGNS } from "../data/backgrounds"

export default function Editor() {
  const { state, dispatch } = usePoster()
  const navigate            = useNavigate()
  const canvasRef           = useRef(null)
  const [showShare, setShowShare] = useState(false)
  const [downloading, setDownloading]   = useState(false)

  // Guard — if no verse selected, send back to create
  if (!state.verseText) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-stone-900 dark:text-stone-100 mb-3">
          No verse selected
        </p>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
          Go back and pick a verse first.
        </p>
        <button
          onClick={() => navigate("/create")}
          className="px-5 py-2.5 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
        >
          Pick a verse
        </button>
      </div>
    )
  }

  function setStyle(patch) {
    dispatch({ type: "SET_STYLE", style: patch })
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const { default: html2canvas } = await import("html2canvas")
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement("a")
      link.download = `postverse-${state.verseRef?.replace(/[^a-z0-9]/gi, "-").toLowerCase() ?? "poster"}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (e) {
      console.error("Download failed:", e)
    } finally {
      setDownloading(false)
    }
  }

  const verse = {
    verseText:       state.verseText,
    verseRef:        state.verseRef,
    translationName: state.translationName,
  }

  const style = {
    bgIndex:       state.bgIndex,
    templateIndex: state.templateIndex,
    fontIndex:     state.fontIndex,
    fontSize:      state.fontSize,
    textAlign:     state.textAlign,
  }

  const alignIcons = {
    left:   AlignLeft,
    center: AlignCenter,
    right:  AlignRight,
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-1"
            >
              <ChevronLeft size={15} />
              Back to verse
            </button>
            <h1 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Style your poster
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShare(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
            >
              <Share2 size={15} />
              Share
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all disabled:opacity-60"
            >
              {downloading
                ? <Loader2 size={15} className="animate-spin" />
                : <Download size={15} />
              }
              {downloading ? "Saving…" : "Download"}
            </button>
          </div>
        </div>

        {/* Main layout — canvas left, controls right */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Canvas ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-20">
              <PosterCanvas
                ref={canvasRef}
                verse={verse}
                style={style}
                className="w-full shadow-2xl shadow-stone-900/20 dark:shadow-stone-900/60"
              />
              {/* Verse chip below canvas */}
              <div className="mt-4 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-0.5">
                  {state.verseRef} · {state.translationName}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {state.verseText}
                </p>
              </div>
            </div>
          </div>

          {/* ── Controls ───────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* Background */}
            <ControlSection label="Background">
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                {BACKGROUNDS.map((bg, i) => {
                  const isGradient = bg.style.startsWith("linear") || bg.style.startsWith("radial")
                  return (
                    <button
                      key={bg.id}
                      title={bg.label}
                      onClick={() => setStyle({ bgIndex: i })}
                      className={`aspect-square rounded-xl transition-all duration-150 ${
                        state.bgIndex === i
                          ? "ring-2 ring-offset-2 ring-amber-500 scale-105"
                          : "hover:scale-105"
                      }`}
                      style={
                        isGradient
                          ? { background: bg.style }
                          : { backgroundColor: bg.style, border: bg.style === "#ffffff" ? "1px solid #e7e5e4" : "none" }
                      }
                    />
                  )
                })}
              </div>
            </ControlSection>

            {/* Template overlay */}
            <ControlSection label="Style">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {TEMPLATES.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setStyle({ templateIndex: i })}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all duration-150 border ${
                      state.templateIndex === i
                        ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                        : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </ControlSection>

            {/* Font */}
            <ControlSection label="Font">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {POSTER_FONTS.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setStyle({ fontIndex: i })}
                    className={`py-3 px-4 rounded-xl text-sm transition-all duration-150 border ${
                      state.fontIndex === i
                        ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                        : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                    }`}
                    style={{ fontFamily: f.css }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </ControlSection>

            {/* Font size + text align */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Font size */}
              <ControlSection label={`Font size — ${state.fontSize}px`}>
                <input
                  type="range"
                  min={13}
                  max={28}
                  value={state.fontSize}
                  onChange={(e) => setStyle({ fontSize: Number(e.target.value) })}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 mt-1">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </ControlSection>

              {/* Text align */}
              <ControlSection label="Alignment">
                <div className="flex gap-2">
                  {TEXT_ALIGNS.map((a) => {
                    const Icon = alignIcons[a.id]
                    return (
                      <button
                        key={a.id}
                        title={a.label}
                        onClick={() => setStyle({ textAlign: a.id })}
                        className={`flex-1 h-10 rounded-xl flex items-center justify-center border transition-all duration-150 ${
                          state.textAlign === a.id
                            ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                            : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <Icon size={16} />
                      </button>
                    )
                  })}
                </div>
              </ControlSection>
            </div>

          </div>
        </div>
      </div>

      {/* Share modal */}
      {showShare && (
        <ShareModal
          verse={verse}
          style={style}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  )
}

// ── Tiny helper ───────────────────────────────────────────────────────
function ControlSection({ label, children }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
      <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
        {label}
      </p>
      {children}
    </div>
  )
}