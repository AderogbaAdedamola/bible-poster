// src/pages/Editor.jsx
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlignLeft, AlignCenter, AlignRight,
  Download, Share2, ChevronLeft, Loader2,
  Image, Layers, Type, SlidersHorizontal
} from "lucide-react"
import { usePoster } from "../context/PosterContext"
import PosterCanvas from "../components/PosterCanvas"
import ShareModal from "../components/ShareModal"
import { BACKGROUNDS, TEMPLATES, POSTER_FONTS, TEXT_ALIGNS } from "../data/backgrounds"
import { downloadPoster } from "../utils/download"

const TABS = [
  { id:"background", label:"Background", icon: Image          },
  { id:"style",      label:"Style",      icon: Layers         },
  { id:"font",       label:"Font",       icon: Type           },
  { id:"text",       label:"Text",       icon: SlidersHorizontal },
]

export default function Editor() {
  const { state, dispatch } = usePoster()
  const navigate            = useNavigate()
  const canvasRef           = useRef(null)
  const [activeTab, setActiveTab]     = useState("background")
  const [showShare, setShowShare]     = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (!state.verseText) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="font-display text-2xl text-stone-900 dark:text-stone-100 mb-3">No verse selected</p>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">Go back and pick a verse first.</p>
        <button onClick={() => navigate("/create")}
          className="px-5 py-2.5 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity">
          Pick a verse
        </button>
      </div>
    )
  }

  function setStyle(patch) {
    dispatch({ type:"SET_STYLE", style: patch })
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      await downloadPoster({ state })
    } catch(e) {
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

  return (
    <>
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={() => navigate("/create")}
            className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors mb-0.5">
            <ChevronLeft size={14} />Back to verse
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all">
            <Share2 size={14} />Share
          </button>
          <button onClick={handleDownload} disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all disabled:opacity-60">
            {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {downloading ? "Saving…" : "Download"}
          </button>
        </div>
      </div>

      {/* ── Canvas — full width centered ────────────────────────── */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs sm:max-w-sm">
          <PosterCanvas
            ref={canvasRef}
            verse={verse}
            style={style}
            className="w-full shadow-2xl shadow-stone-900/25 dark:shadow-stone-900/60"
          />
          {/* Verse info chip */}
          <div className="mt-3 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-0.5">
              {state.verseRef} · {state.translationName}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
              {state.verseText}
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div className="flex gap-1.5 p-1.5 bg-stone-100 dark:bg-stone-800/60 rounded-2xl mb-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              activeTab === id
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}>
            <Icon size={13} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab panels ──────────────────────────────────────────── */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 p-5">

        {/* Background */}
        {activeTab === "background" && (
          <div>
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Gradients</p>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {BACKGROUNDS.slice(0,14).map((bg, i) => (
                <BgSwatch key={bg.id} bg={bg} index={i} selected={state.bgIndex === i} onSelect={() => setStyle({ bgIndex: i })} />
              ))}
            </div>
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Solid colors</p>
            <div className="grid grid-cols-7 gap-2">
              {BACKGROUNDS.slice(14).map((bg, i) => (
                <BgSwatch key={bg.id} bg={bg} index={i+14} selected={state.bgIndex === i+14} onSelect={() => setStyle({ bgIndex: i+14 })} />
              ))}
            </div>
          </div>
        )}

        {/* Style / template */}
        {activeTab === "style" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {TEMPLATES.map((t, i) => (
              <button key={t.id} onClick={() => setStyle({ templateIndex: i })}
                className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-150 ${
                  state.templateIndex === i
                    ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                    : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Font */}
        {activeTab === "font" && (
          <div className="grid grid-cols-2 gap-2.5">
            {POSTER_FONTS.map((f, i) => (
              <button key={f.id} onClick={() => setStyle({ fontIndex: i })}
                className={`flex flex-col items-start px-4 py-3.5 rounded-xl border transition-all duration-150 text-left ${
                  state.fontIndex === i
                    ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                    : "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}>
                <span className="text-[10px] font-medium uppercase tracking-widest opacity-50 mb-1"
                  style={{ fontFamily:"'Inter',sans-serif" }}>
                  {f.label}
                </span>
                <span className="text-base leading-snug" style={{ fontFamily: f.css }}>
                  {f.sample}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Text controls */}
        {activeTab === "text" && (
          <div className="flex flex-col gap-6">
            {/* Font size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                  Font size
                </p>
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {state.fontSize}px
                </span>
              </div>
              <input type="range" min={13} max={28} value={state.fontSize}
                onChange={(e) => setStyle({ fontSize: Number(e.target.value) })}
                className="w-full accent-amber-500" />
              <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 mt-1.5">
                <span>Small</span><span>Large</span>
              </div>
            </div>

            {/* Alignment */}
            <div>
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
                Alignment
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TEXT_ALIGNS.map((a) => {
                  const Icon = a.id === "left" ? AlignLeft : a.id === "center" ? AlignCenter : AlignRight
                  return (
                    <button key={a.id} onClick={() => setStyle({ textAlign: a.id })}
                      className={`flex flex-col items-center gap-2 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                        state.textAlign === a.id
                          ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                          : "bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
                      }`}>
                      <Icon size={16} />
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {showShare && (
      <ShareModal verse={verse} style={style} onClose={() => setShowShare(false)} />
    )}
    </>
  )
}

// ── Background swatch ─────────────────────────────────────────────────
function BgSwatch({ bg, index, selected, onSelect }) {
  const isGradient = bg.style.startsWith("linear") || bg.style.startsWith("radial")
  return (
    <button
      title={bg.label}
      onClick={onSelect}
      className={`aspect-square rounded-xl transition-all duration-150 ${
        selected ? "ring-2 ring-offset-2 ring-amber-500 scale-110" : "hover:scale-105"
      }`}
      style={isGradient
        ? { background: bg.style }
        : { backgroundColor: bg.style, border: bg.style === "#ffffff" ? "1px solid #e7e5e4" : "none" }
      }
    />
  )
}