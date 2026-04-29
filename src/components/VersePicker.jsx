// src/components/VersePicker.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  BookOpen, ChevronRight, ChevronDown,
  Shuffle, Loader2, AlertCircle, Check
} from "lucide-react"
import { usePoster } from "../context/PosterContext"
import { BIBLE_VERSIONS, BIBLE_BOOKS, FEATURED_VERSES } from "../data/bibles"
import {
  fetchChapters, fetchVerses,
  fetchVerseText, fetchRandomVerse
} from "../hooks/useBible"

export default function VersePicker() {
  const { state, dispatch } = usePoster()
  const navigate = useNavigate()

  const [chapters, setChapters]   = useState([])
  const [verses, setVerses]       = useState([])
  const [loading, setLoading]     = useState("")   // "chapters" | "verses" | "verse" | "random" | ""
  const [error, setError]         = useState(null)

  const OT = BIBLE_BOOKS.filter((b) => b.testament === "OT")
  const NT = BIBLE_BOOKS.filter((b) => b.testament === "NT")

  // ── Fetch chapters when book changes ──────────────────────────────
  useEffect(() => {
    if (!state.bookId) return
    setChapters([]); setVerses([])
    setLoading("chapters"); setError(null)
    fetchChapters(state.bibleId, state.bookId)
      .then(setChapters)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(""))
  }, [state.bibleId, state.bookId])

  // ── Fetch verses when chapter changes ────────────────────────────
  useEffect(() => {
    if (!state.chapterId) return
    setVerses([])
    setLoading("verses"); setError(null)
    fetchVerses(state.bibleId, state.chapterId)
      .then(setVerses)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(""))
  }, [state.bibleId, state.chapterId])

  // ── Handlers ──────────────────────────────────────────────────────
  function handleBible(e) {
    const v = BIBLE_VERSIONS.find((b) => b.id === e.target.value)
    dispatch({ type: "SET_BIBLE", bibleId: v.id, bibleName: v.name })
  }

  function handleBook(book) {
    dispatch({ type: "SET_BOOK", bookId: book.id, bookName: book.name })
  }

  function handleChapter(ch) {
    dispatch({ type: "SET_CHAPTER", chapterId: ch.id })
  }

  async function handleVerse(verse) {
    setLoading("verse"); setError(null)
    try {
      const data = await fetchVerseText(state.bibleId, verse.id)
      dispatch({
        type: "SET_VERSE",
        verseId:  verse.id,
        verseRef: data.reference,
        verseText: data.text,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading("")
    }
  }

  async function handleRandom() {
    setLoading("random"); setError(null)
    try {
      const data = await fetchRandomVerse(state.bibleId, FEATURED_VERSES)
      dispatch({
        type: "SET_RANDOM_VERSE",
        verseId:   data.id,
        verseRef:  data.reference,
        verseText: data.text,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading("")
    }
  }

  const canProceed = !!state.verseText

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-stone-400 dark:text-stone-500 uppercase mb-2">
          Step 1 of 2
        </p>
        <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100">
          Choose a verse
        </h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          Pick a Bible version, navigate to your verse, or let us surprise you.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Bible version selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
          Bible version
        </label>
        <div className="relative">
          <select
            value={state.bibleId}
            onChange={handleBible}
            className="w-full sm:w-64 appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {BIBLE_VERSIONS.map((v) => (
              <option key={v.id} value={v.id}>{v.name} — {v.label}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Random verse */}
      <button
        onClick={handleRandom}
        disabled={loading === "random"}
        className="w-full mb-8 flex items-center justify-center gap-2.5 py-3.5 rounded-xl border-2 border-dashed border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-500 dark:hover:text-amber-400 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "random"
          ? <Loader2 size={16} className="animate-spin" />
          : <Shuffle size={16} />
        }
        {loading === "random" ? "Fetching a verse…" : "Surprise me — random verse"}
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
        <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">or browse manually</span>
        <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
      </div>

      {/* Book selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">
          Old Testament
        </label>
        <BookGrid books={OT} selected={state.bookId} onSelect={handleBook} />

        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mt-5 mb-3">
          New Testament
        </label>
        <BookGrid books={NT} selected={state.bookId} onSelect={handleBook} />
      </div>

      {/* Chapter selector */}
      {state.bookId && (
        <div className="mb-6">
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">
            Chapter — {state.bookName}
          </label>
          {loading === "chapters" ? (
            <LoadingDots />
          ) : (
            <div className="flex flex-wrap gap-2">
              {chapters
                .filter((ch) => ch.number !== "intro")
                .map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => handleChapter(ch)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${
                      state.chapterId === ch.id
                        ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                        : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {ch.number}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Verse selector */}
      {state.chapterId && (
        <div className="mb-8">
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">
            Verse
          </label>
          {loading === "verses" ? (
            <LoadingDots />
          ) : (
            <div className="flex flex-wrap gap-2">
              {verses.map((v) => {
                const num = v.id.split(".").pop()
                const isSelected = state.verseId === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVerse(v)}
                    disabled={loading === "verse"}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-60 ${
                      isSelected
                        ? "bg-amber-500 text-white"
                        : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {loading === "verse" && isSelected
                      ? <Loader2 size={12} className="animate-spin mx-auto" />
                      : num
                    }
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected verse preview */}
      {state.verseText && (
        <div className="mb-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <Check size={16} className="text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                {state.verseRef} · {state.bibleName}
              </p>
              <p className="font-display text-xl text-stone-800 dark:text-stone-200 leading-relaxed italic">
                "{state.verseText}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Proceed */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/editor")}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Style your poster
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────

function BookGrid({ books, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {books.map((b) => (
        <button
          key={b.id}
          onClick={() => onSelect(b)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
            selected === b.id
              ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
              : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          {b.name}
        </button>
      ))}
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}