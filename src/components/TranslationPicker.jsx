

import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronDown, Search, Loader2, AlertCircle, Check } from "lucide-react"
import { fetchTranslations } from "../hooks/useBible"

export default function TranslationPicker({ value, valueName, onChange }) {
  const [open, setOpen]               = useState(false)
  const [query, setQuery]             = useState("")
  const [translations, setTranslations] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const containerRef                  = useRef(null)
  const inputRef                      = useRef(null)

  // ── Load translations (from cache or API) ─────────────────────────
  useEffect(() => {
    fetchTranslations()
      .then(setTranslations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // ── Focus search input when dropdown opens ────────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [open])

  // ── Close on outside click ────────────────────────────────────────
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // ── Close on Escape ───────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  // ── Filter list by search query ───────────────────────────────────
  const filtered = useMemo(() => {
    if (!query.trim()) return translations
    const q = query.toLowerCase()
    return translations.filter(
      (t) =>
        t.englishName.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
    )
  }, [query, translations])

  function handleSelect(t) {
    onChange({ id: t.id, name: t.shortName, label: t.englishName })
    setOpen(false)
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative inline-block w-full sm:w-72">

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={loading || !!error}
        className="w-full flex items-center justify-between gap-2 pl-4 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className="truncate">
          {loading ? "Loading translations…" :
           error   ? "Failed to load" :
           valueName ? `${valueName}` : "Select translation"}
        </span>
        {loading
          ? <Loader2 size={14} className="animate-spin text-stone-400 shrink-0" />
          : <ChevronDown
              size={14}
              className={`text-stone-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
        }
      </button>

      {/* Error state */}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Dropdown panel */}
      {open && !loading && !error && (
        <div className="absolute z-50 mt-2 w-full min-w-72 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/10 dark:shadow-stone-900/40 overflow-hidden">

          {/* Search input */}
          <div className="p-2 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800">
              <Search size={13} className="text-stone-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search translations…"
                className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800">
            <p className="text-xs text-stone-400 dark:text-stone-500">
              {filtered.length} translation{filtered.length !== 1 ? "s" : ""}
              {query ? ` for "${query}"` : ""}
            </p>
          </div>

          {/* List */}
          <ul className="max-h-60 overflow-y-auto overscroll-contain">
            {filtered.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-stone-400">
                No translations found
              </li>
            ) : (
              filtered.map((t) => {
                const isSelected = t.id === value
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(t)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                        isSelected
                          ? "bg-amber-50 dark:bg-amber-950/30"
                          : "hover:bg-stone-50 dark:hover:bg-stone-800"
                      }`}
                    >
                      <div className="min-w-0">
                        <span className={`text-sm font-medium block truncate ${
                          isSelected
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-stone-900 dark:text-stone-100"
                        }`}>
                          {t.englishName}
                        </span>
                        <span className="text-xs text-stone-400 dark:text-stone-500">
                          {t.shortName}
                        </span>
                      </div>
                      {isSelected && (
                        <Check size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}