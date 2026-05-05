import { createContext, useContext, useReducer } from "react"
const PosterContext = createContext(null)

const initialState = {
  // Bible selection
  translationId:    "BSB",
  translationName:  "BSB",
  translationLabel: "Berean Standard Bible",

  // Verse selection
  bookId:      null,
  bookName:    null,
  chapter:     null,
  verseNumber: null,
  verseRef:    null,   // e.g. "John 3:16"
  verseText:   null,   // the actual verse content

  // Poster style — filled in by Editor
  bgIndex:       0,
  templateIndex: 0,
  fontIndex:     0,
  fontSize:      20,
  textAlign:     "center",
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_TRANSLATION":
      return {
        ...state,
        translationId:    action.translationId,
        translationName:  action.translationName,
        translationLabel: action.translationLabel ?? "",
        // reset downstream when version changes
        bookId: null, bookName: null,
        chapter: null, verseNumber: null,
        verseRef: null, verseText: null,
      }
    case "SET_BOOK":
      return {
        ...state,
        bookId: action.bookId, bookName: action.bookName,
        chapter: null, verseNumber: null,
        verseRef: null, verseText: null,
      }
    case "SET_CHAPTER":
      return {
        ...state,
        chapter: action.chapter,
        verseNumber: null, verseRef: null, verseText: null,
      }
    case "SET_VERSE":
      return {
        ...state,
        verseNumber: action.verseNumber,
        verseRef:    action.verseRef,
        verseText:   action.verseText,
      }
    case "SET_RANDOM_VERSE":
      return {
        ...state,
        bookId:      action.bookId,
        bookName:    action.bookName,
        chapter:     action.chapter,
        verseNumber: action.verseNumber,
        verseRef:    action.verseRef,
        verseText:   action.verseText,
      }
    case "SET_STYLE":
      return { ...state, ...action.style }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export function PosterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PosterContext.Provider value={{ state, dispatch }}>
      {children}
    </PosterContext.Provider>
  )
}

export function usePoster() {
  const ctx = useContext(PosterContext)
  if (!ctx) throw new Error("usePoster must be used inside PosterProvider")
  return ctx
}