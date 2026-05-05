import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronRight, Shuffle,
  Loader2, AlertCircle, Check
} from "lucide-react"
import TranslationPicker from "./TranslationPicker"
import { usePoster } from "../context/PosterContext"
import { BIBLE_BOOKS, FEATURED_VERSES } from "../data/bibles"
import { fetchChapter, fetchVerse, fetchRandomVerse } from "../hooks/useBible"

export default function VersePicker() {
  const { state, dispatch } = usePoster()
  const navigate = useNavigate()

  const [verses, setVerses]   = useState([])   // verses for selected chapter
  const [loading, setLoading] = useState("")   // "verses" | "verse" | "random" | ""
  const [error, setError]     = useState(null)

  const OT = BIBLE_BOOKS.filter((b) => b.testament === "OT")
  const NT = BIBLE_BOOKS.filter((b) => b.testament === "NT")

  //Handlers

function handleBook(book) {
    dispatch({ type: "SET_BOOK", bookId: book.id, bookName: book.name })
    setVerses([])
    setError(null)
  }

  async function handleChapter(num) {
    dispatch({ type: "SET_CHAPTER", chapter: num })
    setVerses([])
    setLoading("verses")
    setError(null)
    try {
      const data = await fetchChapter(state.translationId, state.bookId, num)
      setVerses(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading("")
    }
  }

  async function handleVerse(verseNumber) {
    setLoading("verse")
    setError(null)
    try {
      const result = await fetchVerse(
        state.translationId,
        state.bookId,
        state.bookName,
        state.chapter,
        verseNumber
      )
      dispatch({
        type: "SET_VERSE",
        verseNumber,
        verseRef:  result.ref,
        verseText: result.text,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading("")
    }
  }

  async function handleRandom() {
    setLoading("random")
    setError(null)
    try {
      const result = await fetchRandomVerse(state.translationId, FEATURED_VERSES)
      // find the book name from our data
      const book = BIBLE_BOOKS.find((b) => b.id === result.bookId)
      dispatch({
        type:        "SET_RANDOM_VERSE",
        bookId:      result.bookId,
        bookName:    book?.name ?? result.bookId,
        chapter:     result.chapter,
        verseNumber: result.verse,
        verseRef:    result.ref,
        verseText:   result.text,
      })
      setVerses([])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading("")
    }
  }

  const selectedBook = BIBLE_BOOKS.find((b) => b.id === state.bookId)
  const chapterCount = selectedBook?.chapters ?? 0

  // Render
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-stone-400 dark:text-stone-500 uppercase mb-2">
          Step 1 of 2
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 dark:text-stone-100">
          Choose a verse
        </h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          Pick a translation, browse to your verse, or let us surprise you.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Translation selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
          Translation
        </label>
        <TranslationPicker
          value={state.translationId}
          valueName={state.translationName
            ? `${state.translationName} — ${state.translationLabel ?? ""}`
            : null}
          onChange={({ id, name, label }) =>
            dispatch({ type: "SET_TRANSLATION", translationId: id, translationName: name, translationLabel: label })
          }
        />
      </div>

      {/* Random verse */}
      <button
        onClick={handleRandom}
        disabled={!!loading}
        className="w-full mb-8 flex items-center justify-center gap-2.5 py-4 rounded-xl border-2 border-dashed border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-500 dark:hover:text-amber-400 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "random"
          ? <Loader2 size={16} className="animate-spin" />
          : <Shuffle size={16} />
        }
        {loading === "random" ? "Fetching a verse…" : "Surprise me — random verse"}
      </button>

      <Divider label="or browse manually" />

      {/* Book selector */}
      <div className="mb-6">
        <SectionLabel>Old Testament</SectionLabel>
        <BookGrid books={OT} selected={state.bookId} onSelect={handleBook} />
        <SectionLabel className="mt-5">New Testament</SectionLabel>
        <BookGrid books={NT} selected={state.bookId} onSelect={handleBook} />
      </div>

      {/* Chapter selector */}
      {state.bookId && (
        <div className="mb-6">
          <SectionLabel>Chapter — {state.bookName}</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleChapter(num)}
                disabled={!!loading}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 ${
                  state.chapter === num
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verse selector */}
      {state.chapter && (
        <div className="mb-8">
          <SectionLabel>Verse</SectionLabel>
          {loading === "verses" ? (
            <LoadingDots />
          ) : (
            <div className="flex flex-wrap gap-2">
              {verses.map((v) => (
                <button
                  key={v.number}
                  onClick={() => handleVerse(v.number)}
                  disabled={!!loading}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 ${
                    state.verseNumber === v.number
                      ? "bg-amber-500 text-white"
                      : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                  }`}
                >
                  {loading === "verse" && state.verseNumber === v.number
                    ? <Loader2 size={12} className="animate-spin mx-auto" />
                    : v.number
                  }
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected verse preview */}
      {state.verseText && (
        <div className="mb-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <Check size={15} className="text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wide">
                {state.verseRef} · {state.translationName}
              </p>
              <p className="font-display text-xl sm:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed italic">
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
          disabled={!state.verseText}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Style your poster
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// Tiny sub-components 

function SectionLabel({ children, className = "" }) {
  return (
    <p className={`text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3 ${className}`}>
      {children}
    </p>
  )
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
      <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">{label}</span>
      <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
    </div>
  )
}

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
    <div className="flex items-center gap-1.5 py-3">
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