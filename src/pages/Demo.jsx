import { useState } from "react"
import { Link } from "react-router-dom"
import {
  BookOpen, Palette, Share2, Download,
  ArrowRight, ChevronRight, Check, Shuffle
} from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: BookOpen,
    title: "Pick your translation",
    subtitle: "Search from 50+ versions",
    description:
      "Use the searchable translation picker to choose from over 50 English Bible versions — KJV, BSB, WEB, ASV, NET and many more. The list loads instantly from a live API and is cached locally so it's always fast.",
    visual: <TranslationVisual />,
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Choose a verse",
    subtitle: "Browse or let us surprise you",
    description:
      'Browse by book, chapter and verse — all 66 books across both Testaments. Or hit "Surprise me" to get a random verse from a curated list of beloved scriptures. The verse text is fetched live and shown in a preview card before you continue.',
    visual: <VerseVisual />,
  },
  {
    number: "03",
    icon: Palette,
    title: "Style your poster",
    subtitle: "Background, font, layout",
    description:
      "The editor gives you four tabs — Background (gradients and solid colors), Style (overlay templates), Font (serif typefaces), and Text (size and alignment). Every change reflects on the canvas in real time.",
    visual: <EditorVisual />,
  },
  {
    number: "04",
    icon: Share2,
    title: "Share or download",
    subtitle: "One link. One tap.",
    description:
      "Download your poster as a crisp 900×1200px PNG ready for print or social media. Or copy a shareable link — when posted on WhatsApp, Twitter or Facebook it shows a rich preview card with your verse and style.",
    visual: <ShareVisual />,
  },
]

export default function Demo() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]
  const Icon = step.icon

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
        <p className="text-xs font-medium tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-3">
          How it works
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 dark:text-stone-100 leading-tight">
          From verse to poster<br className="hidden sm:block" /> in four steps
        </h1>
        <p className="mt-4 text-stone-500 dark:text-stone-400 text-base max-w-md mx-auto leading-relaxed">
          No account. No setup. Takes less than a minute.
        </p>
      </div>

      {/* Step tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {STEPS.map((s, i) => {
            const SIcon = s.icon
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === i
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <span className={`text-xs font-mono ${active === i ? "opacity-60" : "opacity-40"}`}>
                  {s.number}
                </span>
                {s.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left — description */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-medium uppercase tracking-widest">
                  Step {step.number}
                </p>
                <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {step.title}
                </h2>
              </div>
            </div>

            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
              {step.description}
            </p>

            {/* Step dots */}
            <div className="flex items-center gap-2 mt-auto pt-4">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 bg-amber-500"
                      : "w-1.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300"
                  }`}
                />
              ))}
              <button
                onClick={() => setActive((active + 1) % STEPS.length)}
                className="ml-auto flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                Next
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Right — visual */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden min-h-72">
            {step.visual}
          </div>
        </div>
      </div>

      {/* All steps overview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STEPS.map((s, i) => {
            const SIcon = s.icon
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`p-4 rounded-xl text-left border transition-all duration-150 ${
                  active === i
                    ? "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20"
                    : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <span className="text-xs font-mono text-stone-300 dark:text-stone-600 block mb-2">
                  {s.number}
                </span>
                <p className={`text-sm font-medium ${
                  active === i
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-stone-700 dark:text-stone-300"
                }`}>
                  {s.title}
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                  {s.subtitle}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-2xl bg-stone-900 dark:bg-stone-100 p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-white dark:text-stone-900 mb-3">
            Ready to create yours?
          </h2>
          <p className="text-stone-400 dark:text-stone-600 text-sm mb-8">
            Free, no account required. Your poster in under a minute.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white text-stone-900 dark:bg-stone-900 dark:text-white hover:opacity-90 transition-opacity"
          >
            Create a poster
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Step visuals ──────────────────────────────────────────────────────

function TranslationVisual() {
  const versions = [
    { id: "BSB",  name: "Berean Standard Bible",    selected: true  },
    { id: "KJV",  name: "King James Version",        selected: false },
    { id: "WEB",  name: "World English Bible",       selected: false },
    { id: "ASV",  name: "American Standard Version", selected: false },
    { id: "NET",  name: "New English Translation",   selected: false },
    { id: "YLT",  name: "Young's Literal Translation",selected: false },
  ]
  return (
    <div className="p-6 flex flex-col gap-3 h-full">
      <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">
        Translation
      </p>
      {/* Search bar mock */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span className="text-sm text-stone-400">Search translations…</span>
      </div>
      <p className="text-xs text-stone-400 dark:text-stone-500">6 translations</p>
      <div className="flex flex-col gap-1">
        {versions.map((v) => (
          <div
            key={v.id}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${
              v.selected
                ? "bg-amber-50 dark:bg-amber-950/30"
                : "hover:bg-stone-50 dark:hover:bg-stone-800"
            }`}
          >
            <div>
              <p className={`text-sm font-medium ${v.selected ? "text-amber-700 dark:text-amber-400" : "text-stone-700 dark:text-stone-300"}`}>
                {v.name}
              </p>
              <p className="text-xs text-stone-400">{v.id}</p>
            </div>
            {v.selected && (
              <Check size={14} className="text-amber-600 dark:text-amber-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function VerseVisual() {
  const [picked, setPicked] = useState(16)
  const verses = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium">John</span>
        <span className="text-stone-400">→</span>
        <span className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium">Chapter 3</span>
        <span className="text-stone-400">→</span>
        <span className="text-xs text-stone-400">Verse</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {verses.map((v) => (
          <button key={v} onClick={() => setPicked(v)}
            className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${
              picked === v
                ? "bg-amber-500 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200"
            }`}>
            {v}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mt-auto">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
          <Check size={12} /> John 3:{picked} · BSB
        </p>
        <p className="font-display text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed">
          {picked === 16
            ? '"For God so loved the world that he gave his one and only Son…"'
            : '"Whoever believes in him is not condemned…"'
          }
        </p>
      </div>
    </div>
  )
}

function EditorVisual() {
  const [tab, setTab] = useState("bg")
  const bgs = ["linear-gradient(145deg,#0f0c29,#302b63)","linear-gradient(145deg,#2D1B69,#4A3394)","linear-gradient(160deg,#7B3F00,#C68642)","linear-gradient(145deg,#0a1628,#1B4F72)","linear-gradient(150deg,#0d2b1a,#1a5c33)","linear-gradient(140deg,#4a1020,#9b3055)","#0a0a0a","#1c1917","#faf7f2","#0a1628","#c0603a","#c9a84c"]
  const [selBg, setSelBg] = useState(1)
  const tabs = [{ id:"bg", label:"Background" },{ id:"style", label:"Style" },{ id:"font", label:"Font" }]
  return (
    <div className="p-5 flex flex-col gap-4 h-full">
      <div className="flex gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === t.id
                ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "bg" && (
        <div className="grid grid-cols-6 gap-2">
          {bgs.map((bg, i) => (
            <button key={i} onClick={() => setSelBg(i)}
              className={`aspect-square rounded-lg transition-all ${selBg === i ? "ring-2 ring-offset-1 ring-amber-500 scale-110" : "hover:scale-105"}`}
              style={bg.startsWith("linear") ? { background: bg } : { backgroundColor: bg, border: bg === "#faf7f2" ? "1px solid #e7e5e4" : "none" }}
            />
          ))}
        </div>
      )}
      {tab === "style" && (
        <div className="grid grid-cols-2 gap-2">
          {["Clean","Dimmed","Framed","Radiant","Light","Vignette"].map((t, i) => (
            <button key={t}
              className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                i === 0
                  ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900"
                  : "bg-stone-50 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700"
              }`}>
              {t}
            </button>
          ))}
        </div>
      )}
      {tab === "font" && (
        <div className="grid grid-cols-2 gap-2">
          {[
            {label:"Cormorant",  css:"'Georgia',serif",        sample:"Scripture"},
            {label:"Cinzel",     css:"'Times New Roman',serif", sample:"SCRIPTURE"},
            {label:"Lora",       css:"'Georgia',serif",         sample:"Scripture"},
            {label:"Spectral",   css:"'Georgia',serif",         sample:"Scripture"},
          ].map((f, i) => (
            <button key={f.label}
              className={`flex flex-col items-start px-3 py-3 rounded-xl border text-left transition-all ${
                i === 0
                  ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900"
                  : "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
              }`}>
              <span className="text-[9px] uppercase tracking-widest opacity-50 mb-1" style={{fontFamily:"sans-serif"}}>{f.label}</span>
              <span className="text-sm" style={{fontFamily: f.css, fontStyle:"italic"}}>{f.sample}</span>
            </button>
          ))}
        </div>
      )}

      {/* Mini poster preview */}
      <div className="mt-auto rounded-xl overflow-hidden h-20 flex items-center justify-center relative"
        style={{ background: bgs[selBg] }}>
        <p className="text-white text-xs italic font-display text-center px-4 leading-relaxed opacity-90">
          "For God so loved the world…"
        </p>
        <span className="absolute bottom-2 right-3 text-white opacity-30 text-[9px]">POSTVERSE</span>
      </div>
    </div>
  )
}

function ShareVisual() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      {/* Download */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-900 dark:bg-stone-100">
        <div className="w-9 h-9 rounded-lg bg-white/10 dark:bg-stone-900/10 flex items-center justify-center shrink-0">
          <Download size={16} className="text-white dark:text-stone-900" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white dark:text-stone-900">Download PNG</p>
          <p className="text-xs text-white/60 dark:text-stone-500">900 × 1200px · Print ready</p>
        </div>
      </div>

      {/* Share link */}
      <div>
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
          Shareable link
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-400 font-mono truncate">
            postverse.app/v?ref=John+3:16…
          </div>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              copied ? "bg-green-500 text-white" : "bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200"
            }`}>
            {copied ? <Check size={14} /> : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label:"WhatsApp",  color:"bg-green-500" },
          { label:"Twitter / X",color:"bg-stone-800 dark:bg-stone-700" },
          { label:"Facebook",  color:"bg-blue-600" },
          { label:"Telegram",  color:"bg-sky-500" },
        ].map(({ label, color }) => (
          <div key={label}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-medium ${color}`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}